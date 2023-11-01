import axios from "axios";

export const getEthPrice = async () => {
  const url =
    "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=USD";
  const response = await axios(url);
  return response.data;
};
