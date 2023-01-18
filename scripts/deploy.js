const hre = require("hardhat");
//Escrow Factory is deployed to 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512
//Auto360 token is deployed to 0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0
async function main() {
// 
  //const lockedAmount = hre.ethers.utils.parseEther("1");

  const  Factory = await hre.ethers.getContractFactory("Factory");
  const factory = await Factory.deploy();

  await factory.deployed();

  console.log(
    `Escrow Factory is deployed to ${factory.address}`
  );

  const  Auto360 = await hre.ethers.getContractFactory("Auto360");
  const auto360 = await Auto360.deploy();

  await auto360.deployed();

  console.log(
    `Auto360 token is deployed to ${auto360.address}`
  );



}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
