import { ethers } from "hardhat";

async function main() {
    const tokenAddress = "0xc56950724dA6A3779Bc00A7cF8A9A7c4046C2466";
    const spenderAddress = "";
    const approveAmount = ethers.utils.parseEther("50");
    const Token = await ethers.getContractFactory("Auto360");
    const token = Token.attach(tokenAddress);

    const approve = await prayerToken.approve(spenderAddress, approveAmount);
    const tnxReceipt = await approve.wait();
    console.log("Approve Receipt:", tnxReceipt);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});