const { ethers } = require("ethers");
const escrowFactoryABI = [{}]; // ABI of the factory contract

// Connect to the Ethereum network
const provider = new ethers.providers.InfuraProvider("mainnet", "YOUR-PROJECT-ID");

// Instantiate the factory contract
const factoryAddress = "0xA65f93fDB016E5608375256EaB8B0a9D29716749";
const factory = new ethers.Contract(factoryAddress, escrowFactoryABI, provider);

// Signer (wallet) to make the call
const privateKey = "0xYourPrivateKey";
const wallet = new ethers.Wallet(privateKey, provider);

// Create a new escrow contract
factory.createEscrow({
    gasPrice: ethers.utils.parseUnits("10", "gwei")
}).then(tx => {
    return wallet.sendTransaction(tx);
}).then(console.log("Escrow contract address:", tx.contractAddress));
 