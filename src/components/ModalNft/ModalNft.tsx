import { useEffect, useState } from "react";
import { TransactionNft } from "../../context/TransactionContext/types";
import { SupportedTokens } from "../../types/dynamic-system.types";
import "./ModalNft.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

type Props = {
  nftData: TransactionNft;
  supportedTokens: SupportedTokens[];
  currentToken: number;
  offerAmount: string | number;
};

const ModalNft = ({
  nftData,
  supportedTokens,
  currentToken,
  offerAmount,
}: Props) => {
  const [price, setPrice] = useState(0);
  const { cryptoValue } = useGlobalContext();

  useEffect(() => {
    setPrice(cryptoValue * Number(offerAmount));
  }, [cryptoValue, currentToken, nftData, offerAmount]);
  // useEffect(() => {
  //   // setPrice(cryptoValue * Number(offerAmount));
  //   setPrice(cryptoValue);
  // }, [cryptoValue, currentToken, nftData]);
  // useEffect(() => {
  //   // setPrice(cryptoValue * Number(offerAmount));
  //   setPrice(cryptoValue);
  // }, [cryptoValue, currentToken, nftData]);
  //
  const cryptoSymbol =
    supportedTokens[currentToken].symbol === "WETH"
      ? "ETH"
      : supportedTokens[currentToken].symbol;

  return (
    <div className="modal_nft">
      <div className="modal_nft_metadata">
        <img src={nftData.nftImage} alt="" />
        <div className="ellipsis">
          <p className="ellipsis">{nftData.collectionName}</p>
          <p className="ellipsis">{nftData.nftName}</p>
        </div>
      </div>

      <p className="modal_nft_value">
        {nftData.amount || "--"} {nftData.isOffer ? "ETH" : cryptoSymbol}
        <span>(${price.toFixed(2) || "--"})</span>
      </p>
    </div>
  );
};

export default ModalNft;
