import dayjs from "dayjs";
import { NftOffers } from "../../../../types/reservoir-types/nft-offers.types";
import { truncateAddress } from "../../../../utils";
import "./Offers.css";
import { getNftOffers } from "../../../../services/api/marketplace-reservoir-api";
import { collectionContract } from "../../../../config";
import { useState } from "react";
import { useConnectionContext } from "../../../../context/ConnectionContext/ConnectionContext";

type Props = {
  nftOffers: NftOffers;
  tokenId: string;
  setNftOffers: React.Dispatch<React.SetStateAction<NftOffers>>;
};

const Offers = ({ nftOffers, tokenId, setNftOffers }: Props) => {
  const { chainId } = useConnectionContext()!;
  const [isFetching, setIsFetching] = useState(false);
  const token = `${collectionContract}:${tokenId}`;

  const fetchMoreOffers = () => {
    setIsFetching(true);
    getNftOffers(chainId, token, nftOffers.continuation!)
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
