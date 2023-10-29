import { useEffect, useState } from "react";
import OutlineButton from "../../../../components/OutlineButton/OutlineButton";
import SolidButton from "../../../../components/SolidButton/SolidButton";
import { useConnectionContext } from "../../../../context/ConnectionContext/ConnectionContext";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { useNftPageContext } from "../../../../context/NftPageContext/NftPageContext";
import { useTransactionContext } from "../../../../context/TransactionContext/TransactionContext";
import { TransactionNft } from "../../../../context/TransactionContext/types";
import { buyListedNft } from "../../../../services/api/buy-offer-list.api";
import { getSingleNftV2 } from "../../../../services/api/marketplace-reservoir-api";
import { handleBuyOrSellData } from "../../../../services/buying-service";
import { connectWallets } from "../../../../services/web3Onboard";
import {
  Market,
  TokenToken,
} from "../../../../types/reservoir-types/collection-nfts.types";
import { truncateAddress } from "../../../../utils";
import "./NftHeader.css";
import { IoShareSocial } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { BsCheckCircleFill } from "react-icons/bs";

type Props = {
  nftInfo: TokenToken;
  nftPriceData: Market;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NftHeader = ({
  setShowConfirmationModal,
  setShowOfferOrListingModal,
  nftInfo,
  nftPriceData,
}: Props) => {
  const { user, setProvider } = useConnectionContext()!;
  const { setTransactionNft, setTransactionStage, setTransactionHash } =
    useTransactionContext()!;
  const { source, collectionChainId } = useGlobalContext()!;
  const { token, setNftDataV2 } = useNftPageContext()!;

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  const collectionName = nftInfo?.collection?.name;
  const nftName = nftInfo?.name;
  const owner = nftInfo?.owner;
  const orderId = nftPriceData?.floorAsk?.id;
  const userIsOwner = user?.toLowerCase() == owner?.toLowerCase();

  const transactionNft: TransactionNft = {
    collectionName,
    nftName,
    nftImage: nftInfo?.image,
    isOffer: !userIsOwner,
    isSale: false,
    amount: nftPriceData?.floorAsk?.price?.amount?.decimal,
    price: Math.ceil(nftPriceData?.floorAsk?.price?.amount?.usd),
    tokenId: nftInfo?.tokenId,
  };

  const triggerModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    !user ? connectWallets(setProvider) : setter(true);
  };

  const buyOrList = () => {
    setTransactionNft(transactionNft);
    !userIsOwner
      ? triggerModal(setShowConfirmationModal)
      : triggerModal(setShowOfferOrListingModal);

    !userIsOwner &&
      buyListedNft(collectionChainId!, orderId, user!, source).then(
        (result) => {
          setTransactionStage(1);
          handleBuyOrSellData(result, setTransactionStage, setTransactionHash);
        }
      );
  };

  const makeOffer = () => {
    triggerModal(setShowOfferOrListingModal);
    setTransactionNft(transactionNft);
  };

  const refreshMetadata = () => {
    setIsRefreshing(true);
    getSingleNftV2(collectionChainId!, token).then((result) => {
      setNftDataV2(result);
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

  return (
    <div className="nft_header">
      <p>{collectionName}</p>
      <p>{nftName}</p>
      <div className="nft_header_owner">
        <p>
          Owned by <span>{truncateAddress(owner, 5, "...")}</span>
        </p>
        <div>
          <IoShareSocial />
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
        {orderId && (
          <SolidButton
            text={!userIsOwner ? "Buy Now" : "List for Sale"}
            onClick={buyOrList}
          />
        )}
        {!userIsOwner && (
          <OutlineButton text="Make Offer" onClick={makeOffer} />
        )}
      </div>
    </div>
  );
};

export default NftHeader;
