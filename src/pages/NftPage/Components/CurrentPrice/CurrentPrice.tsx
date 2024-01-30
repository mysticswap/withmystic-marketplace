import { Market } from "../../../../types/rsv-types/collection-nfts.types";
import "./CurrentPrice.css";
import { SiOpensea } from "react-icons/si";
import x2y2 from "../../../../assets/x2y2.png";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";

type Props = { nftPriceData: Market };

const CurrentPrice = ({ nftPriceData }: Props) => {
  const { client } = useGlobalContext();
  const currentPriceDecimal = nftPriceData?.floorAsk?.price?.amount?.decimal;
  const currentPriceUsd = Math.round(
    nftPriceData?.floorAsk?.price?.amount?.usd
  );
  const symbol = nftPriceData?.floorAsk?.price?.currency.symbol;
  const source = nftPriceData?.floorAsk?.source?.icon;
  const sourceLink = nftPriceData?.floorAsk?.source?.url;
  const sourceDomain = nftPriceData?.floorAsk?.source?.domain;

  const isFromCurrentMarketplace = sourceDomain == client.hostname;

  return (
    <div className={`current_price ${!currentPriceDecimal ? "hide" : ""}`}>
      <p>Current Price</p>
      <p>
        {currentPriceDecimal} {symbol} <span>(${currentPriceUsd})</span>
      </p>
      <p>
        <span>Listed on</span>
        <a href={sourceLink}>
          {!source?.includes("opensea") ? (
            <img src={client?.favicon} alt="icon" />
          ) : !sourceLink?.includes("opensea") ? (
            <img
              src={
                sourceLink?.includes("x2y2")
                  ? x2y2
                  : isFromCurrentMarketplace
                  ? client?.favicon
                  : source
              }
              alt=""
            />
          ) : (
            <SiOpensea display="block" color="#3498db" size={20} />
          )}
        </a>
      </p>
    </div>
  );
};

export default CurrentPrice;
