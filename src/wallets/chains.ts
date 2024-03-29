import { INFURA_ID } from "../config/index";

const MAINNET_RPC_URL = `https://mainnet.infura.io/v3/${INFURA_ID}`;
const GOERLI_RPC_URL = `https://goerli.infura.io/v3/${INFURA_ID}`;

export const supportedChains = [
  {
    id: "0x1",
    token: "ETH",
    label: "Ethereum Mainnet",
    rpcUrl: MAINNET_RPC_URL,
  },
  {
    id: "0x5",
    token: "ETH",
    label: "Goerli Testnet",
    rpcUrl: GOERLI_RPC_URL,
  },
  {
    id: "0x89",
    token: "MATIC",
    label: "Polygon Mainnet",
    rpcUrl: "https://rpc-mainnet.matic.network",
  },
  {
    id: "0x1b59",
    token: "ZETA",
    label: "Zeta Testnet",
    rpcUrl: "https://zetachain-athens-evm.blockpi.network/v1/rpc/public	",
  },
  {
    id: "0x1b58",
    token: "ZETA",
    label: "Zeta Mainnet",
    rpcUrl: "https://zetachain-evm.blockpi.network/v1/rpc/public",
  },
  {
    id: "0xa4b1",
    token: "ETH",
    label: "Arbitrum One",
    rpcUrl: "https://arbitrum.drpc.org",
  },
  {
    id: "0xa4ba",
    token: "ETH",
    label: "Arbitrum Nova",
    rpcUrl: "https://arbitrum-nova.drpc.org",
  },
  {
    id: "0x13e31",
    token: "ETH",
    label: "Blast",
    rpcUrl: "https://blast.blockpi.network/v1/rpc/public",
  },
  {
    id: "0xaa36a7",
    token: "ETH",
    label: "Sepolia",
    rpcUrl: "'https://ethereum-sepolia-rpc.publicnode.com",
  },
  {
    id: "0x109b4597",
    token: "SFUEL",
    label: "Razor Skale Chain",
    rpcUrl: "https://mainnet.skalenodes.com/v1/turbulent-unique-scheat",
  },
];

export const otherChains = [278611351, 7001, 7000, 5];
