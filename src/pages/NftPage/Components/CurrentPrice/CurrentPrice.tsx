import { Market } from "../../../../types/rsv-types/collection-nfts.types";
import "./CurrentPrice.css";
import { SiOpensea } from "react-icons/si";
import x2y2 from "../../../../assets/x2y2.png";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useEffect, useState } from "react";
import { getAllTokenAuctions } from "../../../../services/api/marketplace-api";
import Icon from "../../../../components/ActivityFilterButton/Icon";
import dayjs from "dayjs";

type Props = { nftPriceData: Market; tokenId: string };

const CurrentPrice = ({ nftPriceData, tokenId }: Props) => {
  const { client, collectionChainId, collectionContract } = useGlobalContext();
  const currentPriceDecimal = nftPriceData?.floorAsk?.price?.amount?.decimal;
  const currentPriceUsd = Math.round(
    nftPriceData?.floorAsk?.price?.amount?.usd
  );
  const symbol = nftPriceData?.floorAsk?.price?.currency.symbol;
  const source = nftPriceData?.floorAsk?.source?.icon;
  const sourceLink = nftPriceData?.floorAsk?.source?.url;
  const sourceDomain = nftPriceData?.floorAsk?.source?.domain;

  const isFromCurrentMarketplace = sourceDomain == client.hostname;

  const power = collectionChainId == 137 ? 10 ** 18 : 10 ** 18;
  const bidToken = collectionChainId == 137 ? "WMATIC" : "WETH";

  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);

  useEffect(() => {
    getActiveAuction();
  }, []);

  const getActiveAuction = async () => {
    let auctions = await getAllTokenAuctions(
      collectionContract,
      collectionChainId
    );

    auctions = auctions?.filter((auction: any) => {
      return auction.auctionComponent
        .map((i: any) => i.identifier)
        .includes(tokenId);
    });
    setActiveAuctions(auctions);
    return auctions;
  };

  return (
    <>
      {activeAuctions.length > 0 ? (
        <div
          className={`current_price ${
            activeAuctions.length <= 0 ? "hide" : ""
          }`}
        >
          <p className="bid-title">
            Minimum Bid{" "}
            <Icon
              text={
                "This item is on auction. The highest bid made above the minimum bid and before the expiry date wins the asset."
              }
            />
          </p>

          <p>
            {(activeAuctions?.[0].startAmount || 0) / power} {bidToken}
          </p>
          <p>
            Auction ends{" "}
            {dayjs(activeAuctions?.[0]?.endTime)
              .locale("en")
              .format("MMMM DD, YYYY [at] h.mm A [UTC]")}
          </p>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default CurrentPrice;
