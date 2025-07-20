# TeslaRWA 智能合约

## 概述

TeslaRWA 是一个智能合约，用于验证和记录特斯拉车辆所有权，实现 RWA（真实世界资产）上链功能。

## 功能特性

- ✅ **Primus zkTLS 验证**：集成 Primus 零知识证明验证系统
- ✅ **推荐码绑定**：将用户钱包地址与特斯拉推荐码进行一对一绑定
- ✅ **车型记录**：存储特斯拉车型信息（Model 3, S, X, Y）
- ✅ **交付状态验证**：验证车辆交付状态
- ✅ **防重复绑定**：确保同一推荐码不能被多个地址使用

## 技术栈

- **Solidity** ^0.8.20
- **Foundry** 开发框架
- **Primus zkTLS** 零知识证明验证
- **Monad Testnet** 目标部署网络

## 快速开始

### 1. 安装依赖

```bash
cd contracts
forge install
```

### 2. 编译合约

```bash
forge build
```

### 3. 运行测试

```bash
forge test
```

### 4. 部署到 Monad Testnet

1. 复制环境变量文件：
```bash
cp .env.example .env
```

2. 在 `.env` 文件中设置你的私钥：
```bash
PRIVATE_KEY=your_private_key_here
```

3. 部署合约：
```bash
forge script script/DeployTeslaRWA.s.sol:DeployTeslaRWA --rpc-url https://testnet-rpc.monad.xyz --broadcast --verify
```

## 合约接口

### 主要函数

#### `verifyTeslaOwnership(Attestation calldata attestation)`
- 验证特斯拉所有权并上链
- 参数：Primus 生成的验证证明
- 功能：解析验证数据，绑定推荐码，记录车型信息

#### `getUserTeslaInfo(address user) → TeslaInfo`
- 获取用户的特斯拉信息
- 返回：车型、交付状态、时间戳、验证状态

#### `isUserVerified(address user) → bool`
- 检查用户是否已验证
- 返回：验证状态

#### `getUserByReferralCode(string referralCode) → address`
- 通过推荐码获取用户地址
- 返回：绑定的钱包地址

### 事件

#### `TeslaVerified(address indexed user, string referralCode, string model, uint256 timestamp)`
- 特斯拉验证成功时触发

#### `ReferralCodeUpdated(address indexed user, string oldCode, string newCode)`
- 推荐码更新时触发

## 数据结构

### TeslaInfo
```solidity
struct TeslaInfo {
    string model;                    // 车型 (Tesla Model 3, S, X, Y)
    bool isDeliveredOrPostDelivered; // 交付状态
    uint256 timestamp;               // 验证时间戳
    bool verified;                   // 验证状态
}
```

### Attestation
Primus zkTLS 生成的验证证明结构，包含：
- 接收者地址
- 网络请求信息
- 响应解析规则
- 验证数据（JSON 格式）
- 验证条件
- 时间戳
- 证明者信息
- 数字签名

## 预期数据格式

特斯拉验证数据应包含以下 JSON 格式：

```json
{
  "isDeliveredOrPostDelivered": "true",
  "referralCode": "hujunjob19256", 
  "model": "m3"
}
```

- `isDeliveredOrPostDelivered`: 交付状态（"true"/"false"）
- `referralCode`: 特斯拉推荐码
- `model`: 车型代码（"m3"=Model 3, "ms"=Model S, "mx"=Model X, "my"=Model Y）

## 网络信息

### Monad Testnet
- **Chain ID**: 10143
- **货币符号**: MON  
- **RPC URL**: https://testnet-rpc.monad.xyz
- **区块浏览器**: https://testnet.monadexplorer.com
- **Primus 合约地址**: 0x1Ad7fD53206fDc3979C672C0466A1c48AF47B431

## 安全考虑

1. **访问控制**: 只有合约所有者可以更新 Primus 地址
2. **防重放攻击**: 每个推荐码只能绑定一个地址
3. **数据完整性**: 通过 Primus zkTLS 确保数据真实性
4. **隐私保护**: 使用零知识证明保护用户隐私

## 许可证

MIT License