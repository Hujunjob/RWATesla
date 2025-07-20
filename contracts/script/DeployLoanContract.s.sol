// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/LoanContract.sol";

contract DeployLoanContract is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // TeslaRWA contract address from previous deployment
        address teslaRWAAddress = 0x27F28dFEE9B1BA4B051DDfFdc86CB347986b1FcB; // Update this with actual deployed address
        
        LoanContract loanContract = new LoanContract(teslaRWAAddress);
        
        console.log("LoanContract deployed to:", address(loanContract));
        console.log("TeslaRWA contract address:", teslaRWAAddress);
        
        vm.stopBroadcast();
    }
}