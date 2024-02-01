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
} from "../../../../services/api/marketplace-reservoir-api";
import { handleBuyOrSellData } from "../../../../services/buy-sale-service";
import { connectWallets } from "../../../../services/web3Onboard";
import {
  Market,
  TokenElement,
  TokenToken,
} from "../../../../types/reservoir-types/collection-nfts.types";
import { redirectToMSWalletPage, truncateAddress } from "../../../../utils";
import "./NftHeader.css";
import { IoShareSocial } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { BsCheckCircleFill } from "react-icons/bs";
import { reservoirActivityTypes } from "../../../../constants";
import { Link, useParams } from "react-router-dom";
import { switchChains } from "../../../../utils/wallet-connection";
import { getDiscordEndpointData } from "../../../../utils/discord-utils";
import { generateSaleActivity } from "../../../../utils/activity-utils";
import { getTransactionNft } from "../../../../utils/transaction-nft.utils";
import {
  getNftHistory,
  getNftOwner,
  getSingleNft,
} from "../../../../services/api/marketplace-api";

type Props = {
  nftInfo: TokenToken;
  nftPriceData: Market;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NftHeaderOS = ({
  setShowConfirmationModal,
  setShowOfferOrListingModal,
  nftInfo,
  nftPriceData,
}: Props) => {
  const { id, contract } = useParams();
  const { user, setProvider, chainId } = useConnectionContext()!;
  const { setTransactionNft, setTransactionStage, setTransactionHash } =
    useTransactionContext()!;
  const { source, collectionChainId, userBalance, client, collectionContract } =
    useGlobalContext();
  const {
    token,
    setNftDataV2,
    setNftOffers,
    setNftActivity,
    setShowShareModal,
    nftDataOS,
    ownerOfNFT,
    setNftDataOS,
    setNftHistory,
    setOwnerOfNFT,
  } = useNftPageContext()!;
  console.log(ownerOfNFT);

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const collectionName = nftDataOS.contract.openSea.collectionName;
  const nftName = nftDataOS.title;
  const owner =
    ownerOfNFT?.owners![0] ?? "0x7bfa8f62939c938badd95be7117c4622e9a55c18";
  // const orderId = nftPriceData?.floorAsk?.id;
  // const currentEthAmount = nftPriceData?.floorAsk?.price?.amount?.native;
  // const currentUsdValue = nftPriceData?.floorAsk?.price?.amount?.usd;
  // const userIsOwner = user?.toLowerCase() == owner?.toLowerCase();

  const nft = {
    token: nftInfo,
    market: nftPriceData,
  } as TokenElement;

  // const isOffer = !userIsOwner;
  // const isSale = false;
  // const txMessage = userIsOwner
  //   ? `I’ve just listed ${nftName} for sale! Any takers?`
  //   : `I’ve just made a bid on ${nftName}!`;

  // const txNft = getTransactionNft(nft, isOffer, isSale, txMessage, user!, 0, 0);

  const triggerModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    !user ? connectWallets(setProvider) : setter(true);
  };

  // const postData = getDiscordEndpointData(nft, user!, client);
  // const activityData = generateSaleActivity(nft, "sale", user!);

  // const buyOrList = () => {
  //   setTransactionNft({
  //     ...txNft,
  //     amount: currentEthAmount,
  //     price: currentUsdValue,
  //   });
  //   !userIsOwner
  //     ? triggerModal(setShowConfirmationModal)
  //     : triggerModal(setShowOfferOrListingModal);

  //   !userIsOwner &&
  //     switchChains(chainId, collectionChainId).then(() => {
  //       buyListedNft(collectionChainId, orderId, user!, source).then(
  //         (result) => {
  //           setTransactionStage(1);
  //           handleBuyOrSellData(
  //             result,
  //             setTransactionStage,
  //             setTransactionHash,
  //             setShowConfirmationModal,
  //             collectionChainId,
  //             postData,
  //             activityData
  //           );
  //         }
  //       );
  //     });
  // };

  // const makeOffer = () => {
  //   triggerModal(setShowOfferOrListingModal);
  //   setTransactionNft(txNft);
  // };

  // const refreshMetadata = async () => {
  //   setIsRefreshing(true);
  //   await Promise.all([
  //     getNftOffers(collectionChainId, token).then((result) => {
  //       setNftOffers(result);
  //     }),
  //     getNftActivity(collectionChainId, token, reservoirActivityTypes).then(
  //       (result) => setNftActivity(result)
  //     ),
  //     getSingleNftV2(collectionChainId, token).then((result) => {
  //       setNftDataV2(result);
  //     }),
  //   ]).then(() => {
  //     setIsRefreshing(false);
  //     setHasRefreshed(true);
  //   });
  // };

  const refreshMetadata = async () => {
    setIsRefreshing(true);
    try {
      const [nftDataResult, nftOwnerResult, nftHistoryResult] =
        await Promise.all([
          getSingleNft(
            collectionContract,
            id!,
            collectionChainId,
            client.apiKey
          ),
          getNftOwner(
            collectionContract,
            id!,
            collectionChainId,
            client.apiKey
          ),
          getNftHistory(
            collectionContract,
            id!,
            collectionChainId,
            client.apiKey
          ),
        ]);

      setNftDataOS(nftDataResult);
      setOwnerOfNFT(nftOwnerResult);
      setNftHistory(nftHistoryResult);

      setIsRefreshing(false);
    } catch (error) {
      // Handle errors here
      setIsRefreshing(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (hasRefreshed) {
      const timer = setTimeout(() => {
        setHasRefreshed(false);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [hasRefreshed]);

  // const userCanBuy = Number(userBalance.ETH) >= currentEthAmount;

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
            {truncateAddress(owner, 5, "...")}
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
        <SolidButton
          text={"List for Sale"}
          // onClick={buyOrList}
          // disabled={!userCanBuy && !userIsOwner}
        />

        {/* {(orderId || userIsOwner) && (
          <SolidButton
            text={
              !userIsOwner
                ? userCanBuy
                  ? "Buy Now"
                  : "Insufficient Balance"
                : "List for Sale"
            }
            onClick={buyOrList}
            disabled={!userCanBuy && !userIsOwner}
          />
        )} */}
        {/* {!userIsOwner && <OutlineButton text="Make Offer" />} */}
      </div>
    </div>
  );
};

export default NftHeaderOS;
