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
};

const ModalNft = ({
  nftData,
  // supportedTokens,
  currentToken,
  offerAmount,
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
  const tokenSymbol = nftData.symbol;

  // if (nftData.isBuyNow) {
  //   tokenSymbol = nftData.symbol;
  // } else {
  //   tokenSymbol = supportedTokens?.[currentToken].symbol;
  // }
  console.log(nftData);

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
        {nftData.amount || "--"} {nftData.isOffer || (nftData.isSale && "wETH")}{" "}
        {!nftData.isOffer && !nftData.isSale && tokenSymbol}
        {/* {!nftData.isBuyNow && tokenSymbol} */}
        <span>({cryptoValue > 0 ? `$${price.toFixed(2)}` : "--"})</span>
      </p>
    </div>
  );
};

export default ModalNft;
