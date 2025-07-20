// 部署脚本 - 可以使用 Hardhat 或其他部署工具
const { ethers } = require("hardhat");

async function main() {
    console.log("Deploying TeslaRWA contract...");
    
    // Monad Testnet 上的 Primus 合约地址
    const PRIMUS_ADDRESS = "0x1Ad7fD53206fDc3979C672C0466A1c48AF47B431";
    
    const TeslaRWA = await ethers.getContractFactory("TeslaRWA");
    const teslaRWA = await TeslaRWA.deploy(PRIMUS_ADDRESS);
    
    await teslaRWA.deployed();
    
    console.log("TeslaRWA deployed to:", teslaRWA.address);
    console.log("Primus address:", PRIMUS_ADDRESS);
    
    // 验证合约 (可选)
    console.log("Verifying contract...");
    try {
        await hre.run("verify:verify", {
            address: teslaRWA.address,
            constructorArguments: [PRIMUS_ADDRESS],
        });
        console.log("Contract verified successfully");
    } catch (error) {
        console.log("Verification failed:", error.message);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });