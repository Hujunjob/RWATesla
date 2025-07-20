// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./TeslaRWA.sol";

contract LoanContract {
    address public teslaRWAContract;
    address public owner;
    uint256 public constant LOAN_AMOUNT = 1 ether; // 1 MON
    
    struct LoanInfo {
        uint256 amount;
        uint256 timestamp;
        bool active;
        string teslaModel;
    }
    
    mapping(address => LoanInfo) public userLoans;
    mapping(address => bool) public hasLoan;
    
    event LoanIssued(address indexed user, uint256 amount, string teslaModel, uint256 timestamp);
    event LoanRepaid(address indexed user, uint256 amount, uint256 timestamp);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier hasVerifiedTesla() {
        TeslaRWA teslaContract = TeslaRWA(teslaRWAContract);
        require(teslaContract.isUserVerified(msg.sender), "User must have verified Tesla");
        _;
    }
    
    modifier noExistingLoan() {
        require(!hasLoan[msg.sender], "User already has an active loan");
        _;
    }
    
    constructor(address _teslaRWAContract) {
        teslaRWAContract = _teslaRWAContract;
        owner = msg.sender;
    }
    
    function requestLoan() external hasVerifiedTesla noExistingLoan {
        require(address(this).balance >= LOAN_AMOUNT, "Insufficient contract balance");
        
        // Get user's Tesla info from TeslaRWA contract
        TeslaRWA teslaContract = TeslaRWA(teslaRWAContract);
        TeslaRWA.TeslaInfo memory teslaInfo = teslaContract.getUserTeslaInfo(msg.sender);
        
        // Create loan record
        userLoans[msg.sender] = LoanInfo({
            amount: LOAN_AMOUNT,
            timestamp: block.timestamp,
            active: true,
            teslaModel: teslaInfo.model
        });
        
        hasLoan[msg.sender] = true;
        
        // Transfer loan amount to user
        payable(msg.sender).transfer(LOAN_AMOUNT);
        
        emit LoanIssued(msg.sender, LOAN_AMOUNT, teslaInfo.model, block.timestamp);
    }
    
    function repayLoan() external payable {
        require(hasLoan[msg.sender], "No active loan found");
        require(msg.value == LOAN_AMOUNT, "Incorrect repayment amount");
        
        userLoans[msg.sender].active = false;
        hasLoan[msg.sender] = false;
        
        emit LoanRepaid(msg.sender, msg.value, block.timestamp);
    }
    
    function getUserLoanInfo(address user) external view returns (LoanInfo memory) {
        return userLoans[user];
    }
    
    function getLoanAmount() external pure returns (uint256) {
        return LOAN_AMOUNT;
    }
    
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }
    
    function deposit() external payable onlyOwner {
        // Allow owner to deposit funds to the contract
    }
    
    function withdraw(uint256 amount) external onlyOwner {
        require(address(this).balance >= amount, "Insufficient balance");
        payable(owner).transfer(amount);
    }
    
    function updateTeslaRWAContract(address _newTeslaRWAContract) external onlyOwner {
        teslaRWAContract = _newTeslaRWAContract;
    }
    
    // Allow contract to receive Ether
    receive() external payable {}
}