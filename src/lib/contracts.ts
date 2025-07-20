export const TESLA_RWA_ABI = [
  {
    "type": "constructor",
    "inputs": [
      {
        "name": "_primusAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "getUserByReferralCode",
    "inputs": [
      {
        "name": "referralCode",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "getUserTeslaInfo",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "internalType": "struct TeslaRWA.TeslaInfo",
        "components": [
          {
            "name": "model",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "isDeliveredOrPostDelivered",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "timestamp",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "verified",
            "type": "bool",
            "internalType": "bool"
          }
        ]
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "isUserVerified",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "owner",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "primusAddress",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "referralCodeToUser",
    "inputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "updatePrimusAddress",
    "inputs": [
      {
        "name": "_newPrimusAddress",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "function",
    "name": "userReferralCodes",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "string",
        "internalType": "string"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "userTeslaInfo",
    "inputs": [
      {
        "name": "",
        "type": "address",
        "internalType": "address"
      }
    ],
    "outputs": [
      {
        "name": "model",
        "type": "string",
        "internalType": "string"
      },
      {
        "name": "isDeliveredOrPostDelivered",
        "type": "bool",
        "internalType": "bool"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "internalType": "uint256"
      },
      {
        "name": "verified",
        "type": "bool",
        "internalType": "bool"
      }
    ],
    "stateMutability": "view"
  },
  {
    "type": "function",
    "name": "verifyTeslaOwnership",
    "inputs": [
      {
        "name": "attestation",
        "type": "tuple",
        "internalType": "struct Attestation",
        "components": [
          {
            "name": "recipient",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "request",
            "type": "tuple",
            "internalType": "struct AttNetworkRequest",
            "components": [
              {
                "name": "url",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "header",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "method",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "body",
                "type": "string",
                "internalType": "string"
              }
            ]
          },
          {
            "name": "reponseResolve",
            "type": "tuple[]",
            "internalType": "struct AttNetworkResponseResolve[]",
            "components": [
              {
                "name": "keyName",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "parseType",
                "type": "string",
                "internalType": "string"
              },
              {
                "name": "parsePath",
                "type": "string",
                "internalType": "string"
              }
            ]
          },
          {
            "name": "data",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "attConditions",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "timestamp",
            "type": "uint64",
            "internalType": "uint64"
          },
          {
            "name": "additionParams",
            "type": "string",
            "internalType": "string"
          },
          {
            "name": "attestors",
            "type": "tuple[]",
            "internalType": "struct Attestor[]",
            "components": [
              {
                "name": "attestorAddr",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "url",
                "type": "string",
                "internalType": "string"
              }
            ]
          },
          {
            "name": "signatures",
            "type": "bytes[]",
            "internalType": "bytes[]"
          }
        ]
      }
    ],
    "outputs": [],
    "stateMutability": "nonpayable"
  },
  {
    "type": "event",
    "name": "ReferralCodeUpdated",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "oldCode",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "newCode",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      }
    ],
    "anonymous": false
  },
  {
    "type": "event",
    "name": "TeslaVerified",
    "inputs": [
      {
        "name": "user",
        "type": "address",
        "indexed": true,
        "internalType": "address"
      },
      {
        "name": "referralCode",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "model",
        "type": "string",
        "indexed": false,
        "internalType": "string"
      },
      {
        "name": "timestamp",
        "type": "uint256",
        "indexed": false,
        "internalType": "uint256"
      }
    ],
    "anonymous": false
  }
] as const;

// 部署后需要更新此地址
export const TESLA_RWA_CONTRACT_ADDRESS = "0x27F28dFEE9B1BA4B051DDfFdc86CB347986b1FcB" as const;

export const MONAD_TESTNET_CONFIG = {
  id: 10143,
  name: "Monad Testnet",
  network: "monad-testnet",
  nativeCurrency: {
    decimals: 18,
    name: "MON",
    symbol: "MON",
  },
  rpcUrls: {
    default: { http: ["https://testnet-rpc.monad.xyz"] },
    public: { http: ["https://testnet-rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "Monad Explorer", url: "https://testnet.monadexplorer.com" },
  },
  testnet: true,
} as const;