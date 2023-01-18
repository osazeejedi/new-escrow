//import { Signer } from "ethers";
//import { ethers} from "hardhat";

const hre = require("hardhat");

//EscrowFactory = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
//Auto360 = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
//price = 1

async function Escrow () {
    EscrowFactory = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
    Auto360 = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
    price = 1
  const  Escrowservice = await hre.ethers.getContractFactory("EscrowService");
  const [owner,buyer, seller] = await hre.ethers.getSigners();
  console.log(
    `signers ${owner,buyer, seller}`
  );
  const escrowservice = await Escrowservice.deploy(buyer,seller,price,Auto360);

  await escrowservice.deployed();

  console.log(
    `Escrow is deployed to ${escrowservice.address, owner, buyer, seller}`
  );
    //const AUT = await ethers.getContractAt("Auto360", Auto360);
    //const EscrowFactory = await ethers.getContractAt("EscrowFactory", EscrowFactory);
    

}

Escrow().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });