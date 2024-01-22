import { TransactionNft } from "../../context/TransactionContext/types";
import { SupportedToken } from "../../types/dynamic-system.types";
import "./ModalNft.css";
import { useNftPageContext } from "../../context/NftPageContext/NftPageContext";

type Props = {
  nftData: TransactionNft;
  supportedTokens: SupportedToken[];
  currentToken: number;
  offerAmount: string | number;
};

const ModalNftBuyNow = ({
  nftData,
}: // supportedTokens,
// currentToken,
// offerAmount,
Props) => {
  console.log(nftData);
  // console.log(nftData);
  // const [price, setPrice] = useState(0);
  // const { cryptoValue } = useGlobalContext();

  let collectionName = nftData.collectionName;
  if (collectionName.length > 23) {
    collectionName = collectionName.split("", 23).join("") + "...";
  }

  // useEffect(() => {
  //   setPrice(cryptoValue * Number(offerAmount));
  // }, [cryptoValue, currentToken, nftData, offerAmount]);

  const { nftPriceData } = useNftPageContext()!;
  if (nftPriceData) {
    const cryptoSymbol = nftPriceData.floorAsk.price.currency.symbol;
    const cryptoPrice = nftPriceData.floorAsk.price.amount.usd;
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
          {nftData.amount || "--"} {nftData.isOffer && cryptoSymbol}
          <span>(${cryptoPrice.toFixed(2) || "--"})</span>
        </p>
      </div>
    );
  } else {
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
          {/* {nftData.amount || "--"} {nftData.isOffer && cryptoSymbol}
          <span>(${cryptoPrice.toFixed(2) || "--"})</span> */}
        </p>
      </div>
    );
  }

  // const cryptoSymbol = nftPriceData.floorAsk.price.currency.symbol;
  // const cryptoPrice = nftPriceData.floorAsk.price.amount.usd;
};

export default ModalNftBuyNow;
