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
];

export const otherChains = ["7001", "7000"]