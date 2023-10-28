import dayjs from "dayjs";
import { NftOffers } from "../../../../types/reservoir-types/nft-offers.types";
import { getHostName, truncateAddress } from "../../../../utils";
import "./Offers.css";
import { getNftOffers } from "../../../../services/api/marketplace-reservoir-api";
import { collectionContract } from "../../../../config";
import { useState } from "react";
import { useConnectionContext } from "../../../../context/ConnectionContext/ConnectionContext";
import { useNftPageContext } from "../../../../context/NftPageContext/NftPageContext";
import { acceptOffer } from "../../../../services/api/buy-offer-list.api";
import { handleBuyData } from "../../../../services/buying-service";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useTransactionContext } from "../../../../context/TransactionContext/TransactionContext";

type Props = {
  nftOffers: NftOffers;
  tokenId: string;
  setNftOffers: React.Dispatch<React.SetStateAction<NftOffers>>;
};

const Offers = ({ nftOffers, tokenId, setNftOffers }: Props) => {
  const { user } = useConnectionContext()!;
  const { collectionChainId } = useGlobalContext()!;
  const { nftInfo } = useNftPageContext()!;
  const { setTransactionStage, setTransactionHash } = useTransactionContext()!;
  const [isFetching, setIsFetching] = useState(false);
  const token = `${collectionContract}:${tokenId}`;

  const fetchMoreOffers = () => {
    setIsFetching(true);
    getNftOffers(collectionChainId!, token, nftOffers.continuation!)
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

  const isOwner = nftInfo?.owner?.toLowerCase() == user?.toLowerCase();

  const acceptBid = () => {
    const source = getHostName();
    acceptOffer(collectionChainId!, user!, token, source).then((result) => {
      handleBuyData(result, setTransactionStage, setTransactionHash);
    });
  };

  return (
    <div className="offers">
      <p className="offers_title">Offers</p>
      <div className="offers_table">
        <div className="offers_table_head">
          <p>Price</p>
          <p>Expires in</p>
          <p>By</p>
        </div>
        <div>
          {nftOffers?.orders?.map((order) => {
            let timeStamp = dayjs(order?.expiration * 1000).fromNow();
            let altTimeStamp =
              timeStamp.startsWith("in") && timeStamp.substring(2);
            const price = order.price.amount.decimal;
            const symbol = order.price.currency.symbol;

            return (
              <div key={order.id} className="offers_table_item">
                <p>
                  {price} {symbol}
                </p>
                <p>{altTimeStamp || timeStamp}</p>
                <p>{truncateAddress(order.maker, 5, "...")}</p>
                {isOwner && (
                  <button className="offer_accept_button" onClick={acceptBid}>
                    Accept
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {nftOffers.continuation && !isFetching && (
          <button className="more_offers_btn" onClick={fetchMoreOffers}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default Offers;
