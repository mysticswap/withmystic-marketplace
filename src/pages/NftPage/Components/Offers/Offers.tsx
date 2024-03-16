import dayjs from "dayjs";
import { NftOffers } from "../../../../types/rsv-types/nft-offers.types";
import {
  getHostName,
  redirectToMSWalletPage,
  truncateAddress,
} from "../../../../utils";
import "./Offers.css";
import { getNftOffers } from "../../../../services/api/marketplace-rsv-api";
import { useEffect, useState } from "react";
import { useConnectionContext } from "../../../../context/ConnectionContext/ConnectionContext";
import { useNftPageContext } from "../../../../context/NftPageContext/NftPageContext";
import { acceptOffer } from "../../../../services/api/buy-offer-list.api";
import { handleBuyOrSellData } from "../../../../services/buy-sale-service";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useTransactionContext } from "../../../../context/TransactionContext/TransactionContext";
import { switchChains } from "../../../../utils/wallet-connection";
import { getDiscordEndpointData } from "../../../../utils/discord-utils";
import { TokenElement } from "../../../../types/rsv-types/collection-nfts.types";
import { generateSaleActivity } from "../../../../utils/activity-utils";
import { getTransactionNft } from "../../../../utils/transaction-nft.utils";
import { getAllTokenAuctions } from "../../../../services/api/marketplace-api";

type Props = {
  nftOffers: NftOffers;
  tokenId: string;
  setNftOffers: React.Dispatch<React.SetStateAction<NftOffers>>;
};

const Offers = ({ nftOffers, tokenId, setNftOffers }: Props) => {
  const { user, chainId } = useConnectionContext()!;
  const { collectionChainId, collectionContract, client } = useGlobalContext();
  const { nftInfo, nftPriceData } = useNftPageContext()!;
  const {
    setTransactionStage,
    setTransactionHash,
    setShowConfirmationModal,
    setTransactionNft,
  } = useTransactionContext()!;
  const [isFetching, setIsFetching] = useState(false);
  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);

  const token = `${collectionContract}:${tokenId}`;
  const nftMarketUrl = window.location.href;

  const nft = { token: nftInfo, market: nftPriceData } as TokenElement;

  useEffect(() => {
    getActiveAuction();
  }, []);

  const fetchMoreOffers = () => {
    setIsFetching(true);
    getNftOffers(collectionChainId, token, nftOffers.continuation!)
      .then((result) => {
        setNftOffers({
          orders: [...nftOffers.orders, ...result.orders],
          continuation: result.continuation,
        });
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  const getActiveAuction = async () => {
    let auctions = await getAllTokenAuctions(
      collectionContract,
      collectionChainId
    );

    console.log(auctions);

    auctions = auctions.filter((auction: any) => {
      return auction.auctionComponent
        .map((i: any) => i.identifier)
        .includes(tokenId);
    });
    setActiveAuctions(auctions);
    return auctions;
  };

  const isOwner = nftInfo?.owner?.toLowerCase() == user?.toLowerCase();

  const power = collectionChainId == 137 ? 10 ** 6 : 10 ** 18;
  const bidToken = collectionChainId == 137 ? "USDT" : "WETH";

  const acceptBid = (
    amount: number,
    price: number,
    offerMaker: string,
    orderId?: string
  ) => {
    const isOffer = false;
    const isSale = true;
    const txMessage = `I’ve just sold ${nftInfo?.name}!`;
    const txNft = getTransactionNft(
      nft,
      isOffer,
      isSale,
      txMessage,
      user!,
      amount,
      price
    );
    setTransactionNft(txNft);
    setShowConfirmationModal(true);
    const source = getHostName();
    switchChains(chainId, collectionChainId).then(() => {
      acceptOffer(collectionChainId, user!, token, source, orderId).then(
        (result) => {
          const postData = getDiscordEndpointData(
            nft,
            offerMaker,
            client,
            nftMarketUrl,
            amount.toString(),
            price.toString()
          );
          const activityData = generateSaleActivity(
            nft,
            "sale",
            offerMaker,
            amount.toString()
          );
          setTransactionStage(1);
          handleBuyOrSellData(
            result,
            setTransactionStage,
            setTransactionHash,
            setShowConfirmationModal,
            collectionChainId,
            postData,
            activityData
          );
        }
      );
    });
  };

  return (
    <>
      {activeAuctions.length > 0 ? (
        <div className="offers">
          <p>Minimum(Last) Bid</p>
          <p className="offers_title">
            {(activeAuctions?.[0]?.lastBidAmount ||
              activeAuctions?.[0].startAmount ||
              0) / power}{" "}
            {bidToken}
          </p>
          <p>Auction ends {activeAuctions?.[0]?.endTime}</p>
        </div>
      ) : (
        <div className="offers">
          <p className="offers_title">Offers</p>
          <div className="offers_table">
            <div className="offers_table_head">
              <p>Price</p>
              <p>Expires in</p>
              <p>By</p>
            </div>
            <div>
              {/* {activeAuctions.length > 0 && } */}
              {nftOffers?.orders?.map((order) => {
                const timeStamp = dayjs(order?.expiration * 1000).fromNow();
                const altTimeStamp =
                  timeStamp.startsWith("in") && timeStamp.substring(2);
                const price = order.price.amount.decimal;
                const usd = order.price.amount.usd;
                const symbol = order.price.currency.symbol;
                const currentTime = new Date().getTime();
                const endTime = order?.expiration * 1000;
                const isExpired = currentTime > endTime;

                return (
                  <div key={order.id} className="offers_table_item">
                    <p>
                      {price} {symbol}
                    </p>
                    {isExpired ? (
                      <p>---</p>
                    ) : (
                      <p>{altTimeStamp || timeStamp}</p>
                    )}
                    <div>
                      <p onClick={() => redirectToMSWalletPage(order.maker)}>
                        {truncateAddress(order.maker, 5, "...")}
                      </p>
                      {isOwner && (
                        <button
                          className="offer_accept_button"
                          onClick={() =>
                            acceptBid(
                              price,
                              usd,
                              order.maker,
                              order?._id || order?.id || order?.swapId
                            )
                          }
                        >
                          Accept
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          {nftOffers.continuation && !isFetching && (
            <button className="more_offers_btn" onClick={fetchMoreOffers}>
              Load More
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Offers;
