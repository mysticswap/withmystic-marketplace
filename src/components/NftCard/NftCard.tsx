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
import {
  getHostName,
  getOnePercentFee,
  getOnePercentFeeToken,
  redirectToMSWalletPage,
} from "../../utils";
import {
  handleBuyOrSellData,
  handleBuyOrSellDataToken,
} from "../../services/buy-sale-service";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { switchChains } from "../../utils/wallet-connection";
import { connectWallets } from "../../services/web3Onboard";
import { balanceChain } from "../../constants";
import {
  getDiscordEndpointData,
  getDiscordEndpointDataToken,
} from "../../utils/discord-utils";
import { generateSaleActivity } from "../../utils/activity-utils";
import {
  getTransactionNft,
  getTransactionNftToken,
} from "../../utils/transaction-nft.utils";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import { ETH_CONTRACT_ADDRESS } from "../OfferOrListingModal/OfferOrListingModal";
import AutoPlayer from "../AutoPlayer/AutoPlayer";
import { useHomeContext } from "../../context/HomeContext/HomeContext";

type Props = { nft: TokenElement };

const NftCard = ({ nft }: Props) => {
  const {
    minimalCards,
    collectionChainId,
    collectionContract,
    userBalance,
    collectionActivity,
    client,
    source,
    listView,
  } = useGlobalContext();
  const { user, chainId, setProvider, setUser, setChainId } =
    useConnectionContext()!;
  const {
    setShowConfirmationModal,
    setTransactionNft,
    setTransactionStage,
    setTransactionHash,
    setShowConfirmationBuyNowModal,
  } = useTransactionContext()!;

  const { diamondHost } = useHomeContext()!;
  const nameRef = useRef(null);
  const isOverflowing = useIsOverflow(nameRef, minimalCards);

  const listActivity = collectionActivity?.activities?.filter(
    ({ type, token }) => {
      return type == "ask" && token?.tokenId == nft?.token?.tokenId;
    }
  );

  const saleActivity = collectionActivity?.activities?.filter(
    ({ type, token }) => {
      return type == "sale" && token?.tokenId == nft?.token?.tokenId;
    }
  );
  const priceSale = nft?.token?.lastSale?.price || saleActivity?.[0]?.price;
  const priceList = nft?.market?.floorAsk?.price || listActivity?.[0]?.price;

  // console.log({ listActivity });

  const timeSale = nft?.token?.lastSale?.timestamp || 0;
  const timeList = nft?.market?.floorAsk?.validUntil || 0;
  const validFrom = nft?.market?.floorAsk?.validFrom || 0;

  const currentEthAmount = priceList?.amount?.decimal;
  const saleSymbol = priceSale?.currency?.symbol;
  const listSymbol = priceList?.currency?.symbol;

  const currentValue = Math.round(priceList?.amount?.usd);

  const lastSale = priceSale?.amount?.decimal;
  const nftName = nft?.token?.name;
  const nftListName = nft?.token?.name?.split("", 14)?.join("");
  const nftId = nft?.token?.tokenId;
  const nftRarity = nft?.token?.rarityRank;
  const topBid = nft?.market?.topBid?.price?.amount?.native || "-";
  const owner = nft?.token?.owner?.split("", 6)?.join("") || "-";
  const sourceIcon = nft?.market?.floorAsk?.source?.icon;
  const sourceLink = nft?.market?.floorAsk?.source?.url;
  const sourceDomain = nft?.market?.floorAsk?.source?.domain;
  const onePercentFee = getOnePercentFee(currentEthAmount);
  const isErc1155 = nft?.token?.kind == "erc1155";
  const supply = nft?.token?.remainingSupply;

  const currentTokenAmount = priceSale?.amount?.decimal;
  const currentUsdValue = priceSale?.amount?.usd;
  const currentTokenSymbol = priceSale?.currency?.symbol;

  const isFromCurrentMarketplace = sourceDomain == client.hostname;
  const currentDecimalToken = priceSale?.currency?.decimals;

  const isETHModal =
    nft?.market?.floorAsk?.price?.currency.contract === ETH_CONTRACT_ADDRESS;

  const onePercentFeeToken = getOnePercentFeeToken(
    currentTokenAmount,
    currentDecimalToken
  );

  const nameLink = (
    <Link to={`/${collectionContract}/${nftId}`}>
      <p ref={nameRef}>{!listView ? nftName : `${nftListName}...`}</p>
    </Link>
  );

  const nftMarketUrl = `https://${source}/${collectionContract}/${nftId}`;
  const postData = getDiscordEndpointData(nft, user!, client, nftMarketUrl);
  const activityData = generateSaleActivity(nft, "sale", user!);

  const postDataToken = getDiscordEndpointDataToken(
    nft,
    user!,
    client,
    nftMarketUrl
  );

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
    } else connectWallets(setUser, setProvider, setChainId);
  };

  const startBuyProcessToken = () => {
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
        onePercentFeeToken
      ).then((result) => {
        setTransactionStage(1);
        handleBuyOrSellDataToken(
          result,
          setTransactionStage,
          setTransactionHash,
          setShowConfirmationBuyNowModal,
          collectionChainId,
          postDataToken,
          activityData
        );
      });
    });
  };

  const buyNftToken = async () => {
    // tx means transaction
    const transactionMessage = `I’ve just bought ${nft?.token?.name}!`;
    const txNft = getTransactionNftToken(
      nft,
      false,
      false,
      transactionMessage,
      user!
    );
    if (user) {
      setTransactionNft({
        ...txNft,
        amount: currentTokenAmount,
        price: currentUsdValue,
        symbol: nft.market.floorAsk.price.currency.symbol,
      });
      setShowConfirmationModal(true);
      startBuyProcessToken();
    } else connectWallets(setUser, setProvider, setChainId);
  };

  const userIsOwner = user?.toLowerCase() == nft?.token?.owner?.toLowerCase();
  const userCanBuy =
    Number(currentEthAmount) <=
    Number(userBalance?.[balanceChain[collectionChainId]]);

  const userCanBuyTokenBalance =
    Number(userBalance[currentTokenSymbol]) >= currentTokenAmount;

  return (
    <div className={!listView ? "nft_card" : "nft_card_list"}>
      <div className="nft_card_image_area">
        {isErc1155 && (
          <div className="nft_card_supply_count">{`x${supply}`}</div>
        )}
        {nft.token.media !== null && !listView ? (
          !diamondHost ? (
            <VideoPlayer
              nftUrl={`/${collectionContract}/${nftId}`}
              posterUrl={nft?.token?.image}
              videoUrl={nft?.token?.media}
            />
          ) : (
            <AutoPlayer
              nftUrl={`/${collectionContract}/${nftId}`}
              posterUrl={nft?.token?.image}
              videoUrl={nft?.token?.media}
            />
          )
        ) : (
          <Link to={`/${collectionContract}/${nftId}`}>
            <picture>
              <source
                srcSet={` ${nft?.token.imageSmall} 250w,
              ${nft?.token?.image} 512w,
              ${nft?.token?.imageLarge} 1000w`}
                sizes="250px"
              />
              <img
                loading="lazy"
                decoding="async"
                src={nft?.token?.optImage || nft?.token?.image}
                alt={`${nft?.token?.name}`}
                role="img"
              />
            </picture>
          </Link>
        )}
      </div>

      <div className={!listView ? "nft_card_details" : "nft_list_details"}>
        <div className="card_name">
          {isOverflowing ? (
            <CustomTooltip text={nftName}>{nameLink}</CustomTooltip>
          ) : (
            <>{nameLink}</>
          )}
        </div>
        <Link to={`/${collectionContract}/${nftId}`}>
          <p className="nft_card_amount">
            {priceList &&
            !listView &&
            (timeList > timeSale || validFrom > timeSale) ? (
              <>
                {`${currentEthAmount} ${listSymbol}`}{" "}
                <span>(${currentValue})</span>
              </>
            ) : (
              <span></span>
            )}
          </p>
        </Link>

        <p className="nft_card_last_sale ellipsis">
          {priceSale && !listView && (
            <>
              Last sale: {lastSale}
              {saleSymbol}
            </>
          )}
        </p>
        {listView && (
          <div className="list_atributes">
            <Link to={`/${collectionContract}/${nftId}`}>
              <p>{nftRarity}</p>
            </Link>
            <div className="list_button_container">
              <button
                className="list_buy_now"
                onClick={isETHModal ? buyNft : buyNftToken}
              >
                {currentEthAmount || "-"} {listSymbol}
              </button>
            </div>
            <Link to={`/${collectionContract}/${nftId}`}>
              <p>
                {lastSale || "-"} {saleSymbol}
              </p>
            </Link>
            <Link to={`/${collectionContract}/${nftId}`}>
              <p>{topBid}</p>
            </Link>
            <Link
              to="#"
              onClick={() => {
                redirectToMSWalletPage(nft?.token?.owner);
              }}
            >
              <p>{owner}</p>
            </Link>
          </div>
        )}
        {currentEthAmount &&
        currentValue &&
        !userIsOwner &&
        isETHModal &&
        !listView ? (
          <button onClick={buyNft} disabled={(user && !userCanBuy) as boolean}>
            {userCanBuy
              ? "Buy now"
              : !user
              ? "Buy now"
              : "Insufficient balance"}
          </button>
        ) : null}

        {currentTokenAmount &&
        currentValue &&
        !userIsOwner &&
        !isETHModal &&
        !listView ? (
          <button
            onClick={buyNftToken}
            disabled={(user && !userCanBuyTokenBalance) as boolean}
          >
            {userCanBuyTokenBalance
              ? "Buy now"
              : !user
              ? "Buy now"
              : "Insufficient balance"}
          </button>
        ) : null}
      </div>

      <div className={!listView ? "source_icon" : "list_icon"}>
        <a href={sourceLink}>
          {!sourceLink ? (
            <img src={client?.favicon} alt="icon" />
          ) : !sourceLink?.includes("opensea") ? (
            <img
              src={
                sourceLink?.includes("x2y2")
                  ? x2y2
                  : isFromCurrentMarketplace
                  ? client?.favicon
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
