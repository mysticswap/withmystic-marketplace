import dayjs from "dayjs";
import { NftOffers } from "../../../../types/reservoir-types/nft-offers.types";
import {
  getHostName,
  redirectToMSWalletPage,
  truncateAddress,
} from "../../../../utils";
import "./Offers.css";
import { getNftOffers } from "../../../../services/api/marketplace-reservoir-api";
import { useState } from "react";
import { useConnectionContext } from "../../../../context/ConnectionContext/ConnectionContext";
import { useNftPageContext } from "../../../../context/NftPageContext/NftPageContext";
import { acceptOffer } from "../../../../services/api/buy-offer-list.api";
import { handleBuyOrSellData } from "../../../../services/buying-service";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useTransactionContext } from "../../../../context/TransactionContext/TransactionContext";
import { switchChains } from "../../../../utils/wallet-connection";
import { TransactionNft } from "../../../../context/TransactionContext/types";

type Props = {
  nftOffers: NftOffers;
  tokenId: string;
  setNftOffers: React.Dispatch<React.SetStateAction<NftOffers>>;
};

const Offers = ({ nftOffers, tokenId, setNftOffers }: Props) => {
  const { user, chainId } = useConnectionContext()!;
  const { collectionChainId, collectionContract } = useGlobalContext()!;
  const { nftInfo } = useNftPageContext()!;
  const {
    setTransactionStage,
    setTransactionHash,
    setShowConfirmationModal,
    setTransactionNft,
  } = useTransactionContext()!;
  const [isFetching, setIsFetching] = useState(false);
  const token = `${collectionContract}:${tokenId}`;

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

  const isOwner = nftInfo?.owner?.toLowerCase() == user?.toLowerCase();

  const acceptBid = (amount: number, price: number) => {
    const transactionNft: TransactionNft = {
      collectionName: nftInfo?.collection?.name,
      nftName: nftInfo?.name,
      nftImage: nftInfo?.image,
      amount,
      price,
      isOffer: false,
      isSale: true,
      tokenId: nftInfo.tokenId,
      message: `I’ve just sold ${nftInfo?.name}!`,
    };
    setTransactionNft(transactionNft);
    setShowConfirmationModal(true);
    const source = getHostName();
    switchChains(chainId, collectionChainId).then(() => {
      acceptOffer(collectionChainId, user!, token, source).then((result) => {
        setTransactionStage(1);
        handleBuyOrSellData(
          result,
          setTransactionStage,
          setTransactionHash,
          setShowConfirmationModal
        );
      });
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
                {isExpired ? <p>---</p> : <p>{altTimeStamp || timeStamp}</p>}
                <p onClick={() => redirectToMSWalletPage(order.maker)}>
                  {truncateAddress(order.maker, 5, "...")}
                </p>
                {isOwner && (
                  <button
                    className="offer_accept_button"
                    onClick={() => acceptBid(price, usd)}
                  >
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
