import "./NftCard.css";
import { Link } from "react-router-dom";
import { TokenElement } from "../../types/rsv-types/collection-nfts.types";
import { useRef } from "react";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { SiOpensea } from "react-icons/si";
import x2y2 from "../../assets/x2y2.png";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useIsOverflow } from "../../hooks/useIsOverflow";
import { buyListedNft } from "../../services/api/buy-offer-list.api";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { getHostName, getOnePercentFee } from "../../utils";
import { handleBuyOrSellData } from "../../services/buy-sale-service";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { switchChains } from "../../utils/wallet-connection";
import { connectWallets } from "../../services/web3Onboard";
import { balanceChain } from "../../constants";
import { getDiscordEndpointData } from "../../utils/discord-utils";
import { generateSaleActivity } from "../../utils/activity-utils";
import { getTransactionNft } from "../../utils/transaction-nft.utils";

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
  const onePercentFee = getOnePercentFee(currentEthAmount);
  const isErc1155 = nft?.token?.kind == "erc1155";
  const supply = nft?.token?.remainingSupply;

  const isFromCurrentMarketplace = sourceDomain == client.hostname;

  const nameLink = (
    <Link to={`/${collectionContract}/${nftId}`}>
      <p ref={nameRef}>{nftName}</p>
    </Link>
  );

  const postData = getDiscordEndpointData(nft, user!, client);
  const activityData = generateSaleActivity(nft, "sale", user!);

  const startBuyProcess = () => {
    const orderId = nft?.market?.floorAsk?.id;
    const source = getHostName();
    const isLocal = sourceDomain == source;

    switchChains(chainId, collectionChainId).then(() => {
      buyListedNft(
        collectionChainId,
        orderId,
        user!,
        source,
        isLocal,
        onePercentFee
      ).then((result) => {
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
      });
    });
  };

  const buyNft = async () => {
    // tx means transaction
    const transactionMessage = `I’ve just bought ${nft?.token?.name}!`;
    const txNft = getTransactionNft(
      nft,
      false,
      false,
      transactionMessage,
      user!
    );
    if (user) {
      setTransactionNft(txNft);
      setShowConfirmationModal(true);
      startBuyProcess();
    } else connectWallets(setProvider);
  };

  const userIsOwner = user?.toLowerCase() == nft?.token?.owner?.toLowerCase();
  const userCanBuy =
    Number(currentEthAmount) <=
    Number(userBalance?.[balanceChain[collectionChainId]]);

  // <img alt="Test Subject #8046" loading="lazy" decoding="async" data-nimg="fill" sizes="(max-width: 20rem) 100vw, (max-width: 30rem) 50vw, (max-width: 50rem) 33.33vw, (max-width: 60rem) 25vw, (max-width: 1024px) 20vw, (max-width: 70rem) 33.333333333333336vw, (max-width: 90rem) 25vw, (max-width: 110rem) 20vw, (max-width: 130rem) 16.666666666666668vw, (max-width: 150rem) 14.285714285714286vw, 12.5vw" srcset="https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=128 128w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=256 256w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=384 384w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=512 512w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=640 640w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=750 750w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=828 828w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=1080 1080w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=1200 1200w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=1920 1920w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=2048 2048w, https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=3840 3840w" src="https://i.seadn.io/gcs/files/e78c33cc8c006dfc17688a88e5a24552.gif?auto=format&amp;dpr=1&amp;w=3840" style="position: absolute; height: 100%; width: 100%; inset: 0px; object-fit: cover; color: transparent;"></img>

  return (
    <div className="nft_card">
      <div className="nft_card_image_area">
        {isErc1155 && (
          <div className="nft_card_supply_count">{`x${supply}`}</div>
        )}
        <Link to={`/${collectionContract}/${nftId}`}>
          {nft.token.media !== null ? (
            <video src={nft.token.media} autoPlay loop muted></video>
          ) : (
            <img src={nft?.token?.image} alt="" />
          )}
        </Link>
      </div>

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
                {`${currentEthAmount} ${symbol}`} <span>(${currentValue})</span>
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
