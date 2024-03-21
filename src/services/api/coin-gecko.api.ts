import axios from "axios";

export const coinList: any = {
  wbtc: "bitcoin",
  weth: "weth",
  usdc: "usd",
  usdt: "usd",
  wmatic: "matic-network",
};

export const getCryptoPrice = async (name: string) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${coinList[name]}&vs_currencies=USD`;
  const response = await axios(url);
  return response.data;
};
