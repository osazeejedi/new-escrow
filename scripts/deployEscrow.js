const hre = require("hardhat");
const { providers } = require("hardhat");
//Escrow Factory is deployed to 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
//
//Escrow is deployed to 0x5FC8d32690cc91D4c39d9d3abcBD16989F875707
async function main() {
// 
  //const lockedAmount = hre.ethers.utils.parseEther("1");
  //const signers = await providers.getSigners();
  //console.log(signers);

  buyer = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
  seller = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
  price = 1
  Auto360="0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

  const  Escrow = await hre.ethers.getContractFactory("EscrowService");
  const escrow = await Escrow.deploy(buyer,seller,price,Auto360);

  await escrow.deployed();

  console.log(
    `Escrow is deployed to ${escrow.address}`
  );

  const amount = 10000000000000000000
  const buyertx = await ethers.Contract(escrow.address,"EscrowService");
  const escrowtx = await buyertx.BuyerSendPayment(amount);
  console.log(escrowtx);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

