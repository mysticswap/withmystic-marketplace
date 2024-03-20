/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import OutlineButton from "../../../../components/OutlineButton/OutlineButton";
import SolidButton from "../../../../components/SolidButton/SolidButton";
import { useConnectionContext } from "../../../../context/ConnectionContext/ConnectionContext";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useNftPageContext } from "../../../../context/NftPageContext/NftPageContext";
import { useTransactionContext } from "../../../../context/TransactionContext/TransactionContext";
import { buyListedNft } from "../../../../services/api/buy-offer-list.api";
import {
  getNftActivity,
  getNftOffers,
  getSingleNftV2,
} from "../../../../services/api/marketplace-rsv-api";
import {
  handleBuyOrSellData,
  handleBuyOrSellDataToken,
} from "../../../../services/buy-sale-service";
import { connectWallets } from "../../../../services/web3Onboard";
import {
  Market,
  TokenElement,
  TokenToken,
} from "../../../../types/rsv-types/collection-nfts.types";
import {
  getOnePercentFee,
  getOnePercentFeeToken,
  redirectToMSWalletPage,
  truncateAddress,
} from "../../../../utils";
import "./NftHeader.css";
import { IoShareSocial } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { BsCheckCircleFill } from "react-icons/bs";
import { rsvActivityTypes } from "../../../../constants";
import { Link } from "react-router-dom";
import { switchChains } from "../../../../utils/wallet-connection";
import {
  getDiscordEndpointData,
  getDiscordEndpointDataToken,
} from "../../../../utils/discord-utils";
import {
  generateSaleActivity,
  generateSaleActivityToken,
} from "../../../../utils/activity-utils";
import {
  getTransactionNft,
  getTransactionNftToken,
} from "../../../../utils/transaction-nft.utils";
import { ETH_CONTRACT_ADDRESS } from "../../../../components/OfferOrListingModal/OfferOrListingModal";
import { getAllTokenAuctions } from "../../../../services/api/marketplace-api";

type Props = {
  nftInfo: TokenToken;
  nftPriceData: Market;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirmationBuyNowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAuctionModal?: React.Dispatch<React.SetStateAction<boolean>>;
};

const NftHeader = ({
  setShowConfirmationModal,
  setShowOfferOrListingModal,
  nftInfo,
  nftPriceData,
  setShowConfirmationBuyNowModal,
}: // setShowAuctionModal,
Props) => {
  const { user, setProvider, chainId, setUser, setChainId } =
    useConnectionContext()!;

  const { setTransactionNft, setTransactionStage, setTransactionHash } =
    useTransactionContext()!;
  const { source, collectionChainId, userBalance, client } = useGlobalContext();
  const {
    token,
    setNftDataV2,
    setNftOffers,
    setNftActivity,
    setShowShareModal,
  } = useNftPageContext()!;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false);
  const [activeAuctions, setActiveAuctions] = useState<any[]>([]);

  const collectionName = nftInfo?.collection?.name;
  const nftName = nftInfo?.name;
  const owner = nftInfo?.owner;
  const orderId = nftPriceData?.floorAsk?.id;
  const currentEthAmount = nftPriceData?.floorAsk?.price?.amount?.native;
  const currentTokenAmount = nftPriceData?.floorAsk?.price?.amount?.decimal;
  const currentTokenSymbol = nftPriceData?.floorAsk?.price?.currency?.symbol;

  const currentDecimalToken = nftPriceData?.floorAsk?.price?.currency?.decimals;
  const currentUsdValue = nftPriceData?.floorAsk?.price?.amount?.usd;
  const sourceDomain = nftPriceData?.floorAsk?.source?.domain;
  const userIsOwner = user?.toLowerCase() == owner?.toLowerCase();
  const onePercentFee = getOnePercentFee(currentEthAmount);
  const onePercentFeeToken = getOnePercentFeeToken(
    currentTokenAmount,
    currentDecimalToken
  );

  const isOwner = owner?.toLowerCase() === user?.toLowerCase();

  const isETHModal =
    nftPriceData?.floorAsk?.price?.currency.contract === ETH_CONTRACT_ADDRESS;

  const nft = {
    token: nftInfo,
    market: nftPriceData,
  } as TokenElement;

  const isOffer = !userIsOwner;
  const isSale = false;
  const txMessage = userIsOwner
    ? `I’ve just listed ${nftName} for sale! Any takers?`
    : `I’ve just made a bid on ${nftName}!`;

  const txMessageToken = !userIsOwner
    ? `I’ve just made a bid on ${nftName}!`
    : "";

  const txNft = getTransactionNft(nft, isOffer, isSale, txMessage, user!, 0, 0);

  useEffect(() => {
    getActiveAuction();
  }, []);

  const txNftToken = getTransactionNftToken(
    nft,
    isOffer,
    isSale,
    txMessageToken,
    user!,
    0,
    0
  );

  const getActiveAuction = async () => {
    let auctions = await getAllTokenAuctions(
      nftInfo?.contract,
      collectionChainId
    );

    auctions = auctions.filter((auction: any) => {
      return auction.auctionComponent
        .map((i: any) => i.identifier)
        .includes(nftInfo?.tokenId);
    });
    setActiveAuctions(auctions);
    return auctions;
  };

  const triggerModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    !user ? connectWallets(setUser, setProvider, setChainId) : setter(true);
  };

  const nftMarketUrl = window.location.href;
  const postData = getDiscordEndpointData(nft, user!, client, nftMarketUrl);
  const activityData = generateSaleActivity(nft, "sale", user!);

  const postDataToken = getDiscordEndpointDataToken(
    nft,
    user!,
    client,
    nftMarketUrl
  );
  const activityDataToken = generateSaleActivityToken(nft, "sale", user!);
  const isLocal = sourceDomain == source;

  const buyOrList = () => {
    setTransactionNft({
      ...txNft,
      amount: currentEthAmount,
      price: currentUsdValue,
    });
    !userIsOwner
      ? triggerModal(setShowConfirmationModal)
      : triggerModal(setShowOfferOrListingModal);

    !userIsOwner &&
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

  const buyNowOtherToken = () => {
    setTransactionNft({
      ...txNftToken,
      amount: currentTokenAmount,
      price: currentUsdValue,
    });

    !userIsOwner && triggerModal(setShowConfirmationBuyNowModal);

    !userIsOwner &&
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
            activityDataToken
          );
        });
      });
  };

  const makeOffer = () => {
    triggerModal(setShowOfferOrListingModal);
    setTransactionNft(txNft);
  };

  // const createAuction = () => {
  //   triggerModal(setShowAuctionModal || setShowOfferOrListingModal);
  //   setTransactionNft(txNft);
  // };

  const refreshMetadata = async () => {
    setIsRefreshing(true);
    await Promise.all([
      getNftOffers(collectionChainId, token).then((result) => {
        setNftOffers(result);
      }),
      getNftActivity(collectionChainId, token, rsvActivityTypes).then(
        (result) => setNftActivity(result)
      ),
      getSingleNftV2(collectionChainId, token).then((result) => {
        setNftDataV2(result);
      }),
    ]).then(() => {
      setIsRefreshing(false);
      setHasRefreshed(true);
    });
  };

  useEffect(() => {
    if (hasRefreshed) {
      setTimeout(() => {
        setHasRefreshed(false);
      }, 3000);
    }
  }, [hasRefreshed]);

  const userCanBuy =
    Number(userBalance.ETH || userBalance.MATIC) >= currentEthAmount;
  const userCanBuyTokenBalance =
    Number(userBalance[currentTokenSymbol]) >= currentTokenAmount;

  return (
    <div className="nft_header">
      <Link to="/">
        <p>{collectionName}</p>
      </Link>
      <p>{nftName}</p>
      <div className="nft_header_owner">
        <p>
          Owned by{" "}
          <span onClick={() => redirectToMSWalletPage(owner)}>
            {isOwner ? "You" : `${truncateAddress(owner, 5, "...")}`}
            {/* {truncateAddress(owner, 5, "...")} */}
          </span>
        </p>
        <div>
          <IoShareSocial onClick={() => setShowShareModal(true)} />
          {!hasRefreshed && (
            <LuRefreshCw
              className={isRefreshing ? "refreshing" : ""}
              onClick={refreshMetadata}
            />
          )}
          {hasRefreshed && <BsCheckCircleFill size={20} color="green" />}
        </div>
      </div>
      <div className="nft_header_button_holder">
        {(orderId || userIsOwner) && isETHModal && (
          <SolidButton
            text={
              !userIsOwner
                ? userCanBuy
                  ? "Buy Now"
                  : "Insufficient Balance"
                : null
            }
            onClick={buyOrList}
            disabled={!userCanBuy && !userIsOwner}
          />
        )}
        {(orderId || userIsOwner) && !isETHModal && (
          <SolidButton
            text={
              !userIsOwner
                ? userCanBuyTokenBalance
                  ? "Buy Now"
                  : "Insufficient Balance"
                : null
            }
            onClick={buyNowOtherToken}
            disabled={!userCanBuyTokenBalance && !userIsOwner}
          />
        )}

        {!userIsOwner && (
          <OutlineButton
            text={activeAuctions.length > 0 ? "Place Bid" : "Make Offer"}
            onClick={makeOffer}
          />
        )}

        {/* {userIsOwner && (
          <OutlineButton text="Create Auction" onClick={createAuction} />
        )}

        {!userIsOwner && (
          <OutlineButton text="Bid on Available Auction" onClick={createAuction} />
        )} */}

        {userIsOwner && (
          <OutlineButton text="Edit Listing" onClick={buyOrList} />
        )}
      </div>
    </div>
  );
};

export default NftHeader;
