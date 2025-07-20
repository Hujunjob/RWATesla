// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/TeslaRWA.sol";

contract DeployTeslaRWA is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        // Monad Testnet 上的 Primus 合约地址
        address primusAddress = 0x1Ad7fD53206fDc3979C672C0466A1c48AF47B431;
        
        vm.startBroadcast(deployerPrivateKey);
        
        TeslaRWA teslaRWA = new TeslaRWA(primusAddress);
        
        vm.stopBroadcast();
        
        console.log("TeslaRWA deployed to:", address(teslaRWA));
        console.log("Primus address:", primusAddress);
        console.log("Owner:", teslaRWA.owner());
    }
}