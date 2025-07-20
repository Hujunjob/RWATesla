# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述
使用 zkTLS 进行身份验证的RWA借贷平台

## 技术栈

- **前端框架**: Next.js + TypeScript
- **UI 组件库**: Shadcn UI  
- **智能合约**: Foundry
- **区块链前端**: Rainbow+wagmi
- **构建工具**: Vite
- **密码学层**: Primus SDK (zkTLS/zkFHE) 文档： @docs/primus.md


## 目录结构
- 前端和后端：app目录，用next.js框架
- 智能合约：contracts目录

## 支持的区块链
- Monad Testnet

## 网络信息
### Monad Testnet
- **网络名称**: Monad Testnet
- **Chain ID**: 10143
- **货币符号**: MON
- **区块浏览器**: https://testnet.monadexplorer.com

### 公共 RPC 端点
| RPC URL | 提供者 | 请求限制 | 批处理调用限制 | 其他限制 |
|---------|--------|----------|----------------|----------|
| https://testnet-rpc.monad.xyz | QuickNode | 25 请求/秒 | 100 | - |
| https://rpc.ankr.com/monad_testnet | Ankr | 300 请求/10 秒，12000 请求/10 分钟 | 100 | 不允许 debug_* 方法 |
| https://rpc-testnet.monadinfra.com | Monad Foundation | 20 请求/秒 | 不允许 | 不允许 eth_getLogs 和 debug_* 方法 |
