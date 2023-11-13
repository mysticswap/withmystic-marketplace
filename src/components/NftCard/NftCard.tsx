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
import { handleBuyOrSellData } from "../../services/buy-sale-service";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { TransactionNft } from "../../context/TransactionContext/types";
import { switchChains } from "../../utils/wallet-connection";
import { connectWallets } from "../../services/web3Onboard";
import { balanceChain } from "../../constants";
import { getDiscordEndpointData } from "../../utils/discord-utils";

type Props = { nft: TokenElement };

const NftCard = ({ nft }: Props) => {
  const {
    minimalCards,
    collectionChainId,
    collectionContract,
    userBalance,
    client,
  } = useGlobalContext();
  const { user, chainId, setProvider } = useConnectionContext()!;
  const {
    setShowConfirmationModal,
    setTransactionNft,
    setTransactionStage,
    setTransactionHash,
  } = useTransactionContext()!;

  const nameRef = useRef(null);
  const isOverflowing = useIsOverflow(nameRef, minimalCards);

  const currentEthAmount = nft?.market?.floorAsk?.price?.amount?.decimal;
  const symbol = nft?.market?.floorAsk?.price?.currency?.symbol;
  const currentValue = Math.ceil(nft?.market?.floorAsk?.price?.amount?.usd);
  const lastSale = nft?.market?.floorAsk?.price?.amount?.decimal;
  const nftName = nft?.token?.name;
  const nftId = nft?.token?.tokenId;
  const sourceIcon = nft?.market?.floorAsk?.source?.icon;
  const sourceLink = nft?.market?.floorAsk?.source?.url;
  const sourceDomain = nft?.market?.floorAsk?.source?.domain;

  const isFromCurrentMarketplace = sourceDomain == client.hostname;

  const nameLink = (
    <Link to={`/${collectionContract}/${nftId}`}>
      <p ref={nameRef}>{nftName}</p>
    </Link>
  );

  const postData = getDiscordEndpointData(nft, user!, client);

  const startBuyProcess = () => {
    const orderId = nft?.market?.floorAsk?.id;
    const source = getHostName();

    switchChains(chainId, collectionChainId).then(() => {
      buyListedNft(collectionChainId, orderId, user!, source).then((result) => {
        setTransactionStage(1);
        handleBuyOrSellData(
          result,
          setTransactionStage,
          setTransactionHash,
          setShowConfirmationModal,
          collectionChainId,
          postData
        );
      });
    });
  };

  const buyNft = async () => {
    const transactionNft: TransactionNft = {
      collectionName: nft?.token?.collection?.name,
      nftName,
      nftImage: nft?.token?.image,
      amount: Number(currentEthAmount),
      price: currentValue,
      isOffer: false,
      isSale: false,
      tokenId: nftId,
      message: `I’ve just bought ${nft?.token?.name}!`,
    };
    if (user) {
      setTransactionNft(transactionNft);
      setShowConfirmationModal(true);
      startBuyProcess();
    } else connectWallets(setProvider);
  };

  const userIsOwner = user?.toLowerCase() == nft?.token?.owner?.toLowerCase();
  const userCanBuy =
    Number(currentEthAmount) <=
    Number(userBalance?.[balanceChain[collectionChainId]]);

  return (
    <div className="nft_card">
      <Link to={`/${collectionContract}/${nftId}`}>
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
        <Link to={`/${collectionContract}/${nftId}`}>
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

        <p className="nft_card_last_sale ellipsis">
          Last sale: {lastSale}
          {symbol} {!lastSale && !symbol && "---"}
        </p>

        {currentEthAmount && currentValue && !userIsOwner ? (
          <button onClick={buyNft} disabled={(user && !userCanBuy) as boolean}>
            {userCanBuy
              ? "Buy now"
              : !user
              ? "Buy now"
              : "Insufficient balance"}
          </button>
        ) : null}
      </div>

      <div className="source_icon">
        <a href={sourceLink}>
          {!sourceLink?.includes("opensea") ? (
            <img
              src={
                sourceLink?.includes("x2y2")
                  ? x2y2
                  : isFromCurrentMarketplace
                  ? client.favicon
                  : sourceIcon
              }
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
