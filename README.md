# 部署说明

## 智能合约部署

### 1. 部署LoanContract合约

首先确保已经部署了TeslaRWA合约，然后部署LoanContract：

```bash
cd contracts
forge script script/DeployLoanContract.s.sol --rpc-url https://testnet-rpc.monad.xyz --broadcast
```

### 2. 更新合约地址

部署完成后，更新 `src/lib/contracts.ts` 中的合约地址：

```typescript
export const LOAN_CONTRACT_ADDRESS = "0xYOUR_DEPLOYED_CONTRACT_ADDRESS" as const;
```

### 3. 为合约充值

LoanContract需要有足够的余额来发放贷款。使用owner账户向合约充值：

```bash
# 使用cast命令向合约发送ETH
cast send YOUR_LOAN_CONTRACT_ADDRESS --value 10ether --private-key YOUR_PRIVATE_KEY --rpc-url https://testnet-rpc.monad.xyz
```

## 前端部署

### 1. 环境变量配置

创建 `.env.local` 文件：

```env
NEXT_PUBLIC_PRIMUS_APP_ID=your_primus_app_id
NEXT_PUBLIC_TESLA_TEMPLATE_ID=your_tesla_template_id
```

### 2. 构建和部署

```bash
npm run build
npm run start
```

## 测试流程

1. **连接钱包** - 使用RainbowKit连接到Monad Testnet
2. **验证特斯拉** - 访问 `/verify` 页面，使用zkTLS验证特斯拉车辆
3. **申请借贷** - 访问 `/loans` 页面，点击申请借贷获得1 MON
4. **还款** - 在loans页面点击还款按钮

## 注意事项

- 每个钱包地址只能申请一次借贷
- 必须先验证特斯拉车辆才能申请借贷
- 合约需要有足够余额才能发放贷款
- 还款后可以重新申请借贷