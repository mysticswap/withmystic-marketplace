import { useEffect, useState } from "react";
import { TransactionNft } from "../../context/TransactionContext/types";
import { SupportedToken } from "../../types/dynamic-system.types";
import "./ModalNft.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

type Props = {
  nftData: TransactionNft;
  supportedTokens?: SupportedToken[];
  currentToken: number;
  offerAmount: string | number;
  isSale?: boolean;
};

const ModalNft = ({
  nftData,
  supportedTokens,
  currentToken,
  offerAmount,
  isSale,
}: Props) => {
  const [price, setPrice] = useState(0);
  const { cryptoValue } = useGlobalContext();

  let collectionName = nftData.collectionName;
  if (collectionName.length > 23) {
    collectionName = collectionName.split("", 23).join("") + "...";
  }

  useEffect(() => {
    if (!nftData.isBuyNow) {
      setPrice(cryptoValue * Number(offerAmount));
    } else {
      setPrice(Number(offerAmount));
    }
  }, [cryptoValue, currentToken, nftData, offerAmount]);
  let tokenSymbol: string | undefined = nftData.symbol;

  if (nftData.isBuyNow) {
    tokenSymbol = nftData.symbol;
  } else {
    tokenSymbol = supportedTokens?.[currentToken].symbol;
  }

  return (
    <div className="modal_nft">
      <div className="modal_nft_metadata">
        <img src={nftData.nftImage} alt="" />
        <div className="ellipsis">
          <p className="ellipsis">{collectionName}</p>
          <p className="ellipsis">{nftData.nftName}</p>
        </div>
      </div>

      <p className="modal_nft_value">
        {nftData.amount || "--"} {isSale && tokenSymbol}
        {!isSale && !nftData.isOffer && tokenSymbol}
        {!isSale && nftData.isOffer && "wETH"}
        <span>({cryptoValue > 0 ? `$${price.toFixed(2)}` : "--"})</span>
      </p>
    </div>
  );
};

export default ModalNft;
