import { Market } from "../../../../types/reservoir-types/collection-nfts.types";
import "./CurrentPrice.css";
import { SiOpensea } from "react-icons/si";

type Props = { nftPriceData: Market };

const CurrentPrice = ({ nftPriceData }: Props) => {
  const currentPriceDecimal = nftPriceData?.floorAsk?.price?.amount?.decimal;
  const currentPriceUsd = Math.ceil(nftPriceData?.floorAsk?.price?.amount?.usd);
  const symbol = nftPriceData?.floorAsk?.price?.currency.symbol;
  const source = nftPriceData?.floorAsk?.source?.icon;
  const sourceLink = nftPriceData?.floorAsk?.source?.url;

  return (
    <div className="current_price">
      <p>Current Price</p>
      <p>
        {currentPriceDecimal} {symbol} <span>(${currentPriceUsd})</span>
      </p>
      <p>
        <span>Listed on</span>
        <a href={sourceLink}>
          {!source?.includes("opensea") ? (
            <img src={source} alt="" />
          ) : (
            <SiOpensea display="block" color="#3498db" size={20} />
          )}
        </a>
      </p>
    </div>
  );
};

export default CurrentPrice;
