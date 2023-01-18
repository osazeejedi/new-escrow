//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
contract Factory  {
   EscrowService[] public EscrowArray;
   event CreatedEscrow (EscrowService escrow);

   function CreateNewEscrow(address payable buyeraddress, address payable selleraddress, uint32 amount,address Token) public {
     EscrowService escrow = new EscrowService(buyeraddress,selleraddress,amount,Token);
     EscrowArray.push(escrow);
     emit CreatedEscrow (escrow);

   }
   function getescrowClone() external view returns (EscrowService[] memory) {
        return EscrowArray;
    }

    function getNumberofescrowMade() external view returns (uint256) {
        return EscrowArray.length;
    }

}


contract EscrowService is AccessControl { //Ownable, 

    // @dev Roles are referred to by their bytes32 identifier. 
    // @dev These should be exposed in the external API and be unique. 
    bytes32 public constant AGENT_ROLE = keccak256("AGENT_ROLE");
    bytes32 public constant BUYER_ROLE = keccak256("BUYER_ROLE");
    bytes32 public constant SELLER_ROLE = keccak256("SELLER_ROLE");


    /// @dev Defining initial varible to work with the escrow contract
    address vault;
    address root;
    address payable agent;
    address payable buyer;
    address payable seller;
    
    /// @dev Defining varible that will hold the values transactionated in the contract
    uint256 public price;
    uint256 public fee;

    /// @dev State varible to track escrow stage
    uint32 public status;
    address token;
    mapping(address => uint) SBCbalance;
    /// @dev Create the community role, with `root` as a member.
    constructor(address payable _buyer_address, address payable _seller_address, uint32 _price, address AUTtoken) {
        
        status = 0 ;
        vault = address(this);
        root = msg.sender;
        agent = payable(msg.sender);
        buyer = _buyer_address;
        seller= _seller_address;
        price = _price*10**18;
        token = AUTtoken;
        
        _setupRole(AGENT_ROLE, agent);
        _setupRole(BUYER_ROLE, buyer);
        _setupRole(SELLER_ROLE, seller);
    }

    function setfee (uint256 _fee)public onlyRole(BUYER_ROLE)returns(uint){
        fee = _fee;
        return fee;
    }
            
    /// @notice This should be the first stage of the negociation! //address payable _seller, uint _price
    function BuyerSendPayment(uint amount) external payable onlyRole(BUYER_ROLE) { 
        require (amount > fee, "Escrow Agent tax of 1 Ether must be covered!");
        //require (_seller == seller, "Buyer must confirm the seller address!");
        require (amount >= price, "please pay at least the minimal price for the products");
        require (status == 0 , "This should be the first stage of the negociation!");
        IERC20(token).transferFrom(buyer, agent, fee);
        uint256 new_price = amount - fee;
        IERC20(token).transferFrom(buyer,vault, new_price);
        status = 1 ;
    }

    /// @notice This should be the second stage of the negociation!"
    function SellerClaimPayment () public onlyRole(SELLER_ROLE) {
        require (status == 1 , "This should be the second stage of the negociation!");
        status = 2 ;
    }

    /// @notice Only the buyer can confirm the deliver.
    function BuyerConfirmDeliver () payable public onlyRole(BUYER_ROLE) {
        require (status == 2 , "This should be the third stage of the negociation!");
        status = 3 ;
        IERC20(token).transfer(seller, vault.balance);
    }

    /// @notice Only the buyer can deny the deliver.
    function BuyerDenyDeliver () public onlyRole(BUYER_ROLE) {
        require (status == 2 , "This should be the third stage of the negociation!");
        status = 4 ;
    }
  
    /// @notice If conditions met: escrow agent releases to seller.
    function AgentConfirmTransaction () public onlyRole(AGENT_ROLE) {
        require (status == 4 , "This should be the fourth stage of the negociation!");
        status = 5 ;
        IERC20(token).transfer(seller,vault.balance);
    }

    /// @notice If conditions does not met: escrow agent revert to buyer.
    function AgentCancelTransaction () onlyRole(AGENT_ROLE) public {
        require (status == 4 , "This should be the fourth stage of the negociation!");
        status = 5 ;
        IERC20(token).transfer(buyer,vault.balance); 
    }

    /// @notice Only the agent can check vault balance.
    function VaultBalance () public view returns(uint256){
        require (status >=1 , "Transaction not started yet!");
        return vault.balance;
    }

    receive() external payable {}

}