import axios from "axios";

export const getCryptoPrice = async (name: string) => {
  const url = `https://api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=USD`;
  const response = await axios(url);
  return response.data;
};
