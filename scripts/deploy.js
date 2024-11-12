const hre =require("hardhat");
async function main() {
    const Create = await hre.ethers.getContractFactory("Create");
    const create = await Create.deploy();  // Deploy the contract

    await create.deployed();  // Wait until the deployment is complete

    console.log("Create contract deployed to:",create.address);
}

// Run the function and catch any errors
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});