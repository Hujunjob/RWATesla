// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@primuslabs/zktls-contracts/src/IPrimusZKTLS.sol";

contract TeslaRWA {
    address public primusAddress;
    address public owner;
    
    struct TeslaInfo {
        string model;
        bool isDeliveredOrPostDelivered;
        uint256 timestamp;
        bool verified;
    }
    
    mapping(address => string) public userReferralCodes;
    mapping(address => TeslaInfo) public userTeslaInfo;
    mapping(string => address) public referralCodeToUser;
    
    event TeslaVerified(address indexed user, string referralCode, string model, uint256 timestamp);
    event ReferralCodeUpdated(address indexed user, string oldCode, string newCode);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    constructor(address _primusAddress) {
        primusAddress = _primusAddress;
        owner = msg.sender;
    }
    
    function verifyTeslaOwnership(Attestation calldata attestation) external {
        require(IPrimusZKTLS(primusAddress).verifyAttestation(attestation), "Invalid Primus attestation");
        
        string memory data = attestation.data;
        
        (bool isDelivered, string memory referralCode, string memory model) = parseAttestationData(data);
        
        require(isDelivered, "Tesla must be delivered or post-delivered");
        require(bytes(referralCode).length > 0, "Referral code cannot be empty");
        require(bytes(model).length > 0, "Model cannot be empty");
        
        address currentUser = referralCodeToUser[referralCode];
        if (currentUser != address(0) && currentUser != msg.sender) {
            revert("Referral code already bound to another user");
        }
        
        string memory oldReferralCode = userReferralCodes[msg.sender];
        if (bytes(oldReferralCode).length > 0) {
            delete referralCodeToUser[oldReferralCode];
            emit ReferralCodeUpdated(msg.sender, oldReferralCode, referralCode);
        }
        
        userReferralCodes[msg.sender] = referralCode;
        referralCodeToUser[referralCode] = msg.sender;
        
        userTeslaInfo[msg.sender] = TeslaInfo({
            model: model,
            isDeliveredOrPostDelivered: isDelivered,
            timestamp: block.timestamp,
            verified: true
        });
        
        emit TeslaVerified(msg.sender, referralCode, model, block.timestamp);
    }
    
    function parseAttestationData(string memory data) internal pure returns (bool isDelivered, string memory referralCode, string memory model) {
        bytes memory dataBytes = bytes(data);
        
        (bool foundDelivered, string memory deliveredValue) = extractJsonValue(dataBytes, "isDeliveredOrPostDelivered");
        (bool foundReferral, string memory referralValue) = extractJsonValue(dataBytes, "referralCode");
        (bool foundModel, string memory modelValue) = extractJsonValue(dataBytes, "model");
        
        require(foundDelivered && foundReferral && foundModel, "Missing required fields in attestation data");
        
        isDelivered = keccak256(bytes(deliveredValue)) == keccak256(bytes("true"));
        referralCode = referralValue;
        model = modelValue;
    }
    
    function extractJsonValue(bytes memory data, string memory key) internal pure returns (bool found, string memory value) {
        bytes memory keyBytes = abi.encodePacked("\"", key, "\":\"");
        
        for (uint i = 0; i <= data.length - keyBytes.length; i++) {
            bool match = true;
            for (uint j = 0; j < keyBytes.length; j++) {
                if (data[i + j] != keyBytes[j]) {
                    match = false;
                    break;
                }
            }
            
            if (match) {
                uint startIndex = i + keyBytes.length;
                uint endIndex = startIndex;
                
                while (endIndex < data.length && data[endIndex] != 0x22) { // 0x22 is '"'
                    endIndex++;
                }
                
                if (endIndex > startIndex) {
                    bytes memory valueBytes = new bytes(endIndex - startIndex);
                    for (uint k = 0; k < endIndex - startIndex; k++) {
                        valueBytes[k] = data[startIndex + k];
                    }
                    return (true, string(valueBytes));
                }
            }
        }
        
        return (false, "");
    }
    
    function getUserTeslaInfo(address user) external view returns (TeslaInfo memory) {
        return userTeslaInfo[user];
    }
    
    function getUserByReferralCode(string memory referralCode) external view returns (address) {
        return referralCodeToUser[referralCode];
    }
    
    function isUserVerified(address user) external view returns (bool) {
        return userTeslaInfo[user].verified;
    }
    
    function updatePrimusAddress(address _newPrimusAddress) external onlyOwner {
        primusAddress = _newPrimusAddress;
    }
}