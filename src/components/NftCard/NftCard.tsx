import "./NftCard.css";
import { Link } from "react-router-dom";
import { TokenElement } from "../../types/reservoir-types/collection-nfts.types";
import { useRef } from "react";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { SiOpensea } from "react-icons/si";
import x2y2 from "../../assets/x2y2.png";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useIsOverflow } from "../../hooks/useIsOverflow";
import { buyListedNft } from "../../services/api/buy-offer-list.api";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { getHostName } from "../../utils";
import { handleBuyData } from "../../services/buying-service";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { TransactionNft } from "../../context/TransactionContext/types";

type Props = { nft: TokenElement };

const NftCard = ({ nft }: Props) => {
  const { minimalCards, collectionChainId } = useGlobalContext()!;
  const { user } = useConnectionContext()!;
  const {
    setShowConfirmationModal,
    setTransactionNft,
    setTransactionStage,
    setTransactionHash,
  } = useTransactionContext()!;

  const nameRef = useRef(null);
  const isOverflowing = useIsOverflow(nameRef, minimalCards);

  const currentEthAmount =
    nft?.market?.floorAsk?.price?.amount?.decimal?.toFixed(4);
  const symbol = nft?.market?.floorAsk?.price?.currency?.symbol;
  const currentValue = Math.ceil(nft?.market?.floorAsk?.price?.amount?.usd);
  const lastSale = nft?.market?.floorAsk?.price?.amount?.decimal?.toFixed(4);
  const nftName = nft?.token?.name;
  const nftId = nft?.token?.tokenId;
  const sourceIcon = nft?.market?.floorAsk?.source?.icon;
  const sourceLink = nft?.market?.floorAsk?.source?.url;

  const nameLink = (
    <Link to={`/nft/${nftId}`}>
      <p ref={nameRef}>{nftName}</p>
    </Link>
  );

  const buyNft = async () => {
    const transactionNft: TransactionNft = {
      collectionName: nft?.token?.collection?.name,
      nftName,
      nftImage: nft?.token?.image,
      amount: Number(currentEthAmount),
      price: currentValue,
      isOffer: false,
      tokenId: nftId,
    };
    setTransactionNft(transactionNft);
    setShowConfirmationModal(true);

    const orderId = nft?.market?.floorAsk?.id;
    const source = getHostName();

    buyListedNft(collectionChainId!, orderId, user!, source).then((result) => {
      setTransactionStage(1);
      handleBuyData(result, setTransactionStage, setTransactionHash);
    });
  };

  const userIsOwner = user?.toLowerCase() == nft?.token?.owner?.toLowerCase();

  return (
    <div className="nft_card">
      <Link to={`/nft/${nftId}`}>
        <img src={nft?.token?.image} alt="" />
      </Link>
      <div className="nft_card_details">
        <div className="card_name">
          {isOverflowing ? (
            <CustomTooltip text={nftName}>{nameLink}</CustomTooltip>
          ) : (
            <>{nameLink}</>
          )}
        </div>
        <Link to={`/nft/${nftId}`}>
          <p className="nft_card_amount">
            {currentEthAmount && currentValue ? (
              <>
                {currentEthAmount} <span>(${currentValue})</span>
              </>
            ) : (
              <span>---</span>
            )}
          </p>
        </Link>

        <p className="nft_card_last_sale">
          Last sale: {lastSale}
          {symbol} {!lastSale && !symbol && "---"}
        </p>

        {currentEthAmount && currentValue && !userIsOwner && (
          <button onClick={buyNft}>Buy now</button>
        )}
      </div>

      <div className="source_icon">
        <a href={sourceLink}>
          {!sourceLink?.includes("opensea") ? (
            <img
              src={sourceLink?.includes("x2y2") ? x2y2 : sourceIcon}
              alt=""
            />
          ) : (
            <SiOpensea display="block" color="#3498db" size={20} />
          )}
        </a>
      </div>
    </div>
  );
};

export default NftCard;
