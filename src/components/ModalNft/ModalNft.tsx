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
  // console.log(nftData);
  const [price, setPrice] = useState(0);
  const { cryptoValue } = useGlobalContext();

  let collectionName = nftData.collectionName;
  if (collectionName.length > 23) {
    collectionName = collectionName.split("", 23).join("") + "...";
  }

  useEffect(() => {
    setPrice(cryptoValue * Number(offerAmount));
  }, [cryptoValue, currentToken, nftData, offerAmount]);

  const cryptoSymbol = supportedTokens[currentToken].symbol;

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
        {/* {nftData.amount || "--"} {nftData.isOffer ? "wETH" : cryptoSymbol} */}
        {nftData.amount || "--"}
        {nftData.isOffer ? "wETH" : cryptoSymbol}
        <span>(${price.toFixed(2) || "--"})</span>
      </p>
    </div>
  );
};

export default ModalNft;
