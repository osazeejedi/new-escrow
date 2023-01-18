const { providers, Contract } = require('ethers');

// Connect to the Ethereum network
const provider = new providers.InfuraProvider('mainnet', 'YOUR-PROJECT-ID');

// The address of the deployed escrow contract
const contractAddress = "0xfC8492D836C6981665c64dBA3570De91fED2dE6A";

// The ABI (Application Binary Interface) of the contract, used to interact with it
const contractABI = "[CONTRACT ABI]";

// Create a contract object
const contract = new Contract(contractAddress, contractABI, provider);

// The private key of the account that will send the transactions
const privateKey = "[YOUR PRIVATE KEY]";

// Create a wallet from the private key
const wallet = new ethers.Wallet(privateKey, provider);

// Function to release the funds to the recipient
async function releaseFunds() {
    try {
        // Estimate the gas required for the transaction
        const gasEstimate = await contract.estimate.release();
        // Build the transaction
        const transaction = {
            gasLimit: gasEstimate,
            gasPrice: await provider.getGasPrice(),
        };
        // Sign and send the transaction
        const signedTransaction = await wallet.sign(transaction);
        const receipt = await provider.sendTransaction(signedTransaction);
        // Check if the transaction was successful
        if (receipt.status === 1) {
            console.log("Funds released successfully");
        } else {
            console.log("Failed to release funds");
        }
    } catch (err) {
        console.error(err);
    }
}

// Function to cancel the escrow
async function cancelEscrow() {
    try {
        // Estimate the gas required for the transaction
        const gasEstimate = await contract.estimate.cancel();
        // Build the transaction
        const transaction = {
            gasLimit: gasEstimate,
            gasPrice: await provider.getGasPrice(),
        };
        // Sign and send the transaction
        const signedTransaction = await wallet.sign(transaction);
        const receipt = await provider.sendTransaction(signedTransaction);
        // Check if the transaction was successful
        if (receipt.status === 1) {
            console.log("Escrow canceled successfully");
        } else {
            console.log("Failed to cancel escrow");
        }
    } catch (err) {
        console.error(err);
    }
}