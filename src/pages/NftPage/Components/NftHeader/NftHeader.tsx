import OutlineButton from "../../../../components/OutlineButton/OutlineButton";
import SolidButton from "../../../../components/SolidButton/SolidButton";
import { useConnectionContext } from "../../../../context/ConnectionContext/ConnectionContext";
import { useTransactionContext } from "../../../../context/TransactionContext/TransactionContext";
import { OfferOrListUiData } from "../../../../context/TransactionContext/types";
import { connectWallets } from "../../../../services/web3Onboard";
import {
  Market,
  TokenToken,
} from "../../../../types/reservoir-types/collection-nfts.types";
import { truncateAddress } from "../../../../utils";
import "./NftHeader.css";
import { IoShareSocial } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

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
  const { setOfferOrListModalContent } = useTransactionContext()!;
  const collectionName = nftInfo?.collection?.name;
  const nftName = nftInfo?.name;
  const owner = nftInfo?.owner;

  const triggerModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    !user ? connectWallets(setProvider) : setter(true);
  };

  const makeOffer = () => {
    triggerModal(setShowOfferOrListingModal);
    const offerData: OfferOrListUiData = {
      collectionName,
      nftName,
      nftImage: nftInfo.image,
      isOffer: true,
      amount: nftPriceData?.floorAsk?.price?.amount?.decimal,
      price: Math.ceil(nftPriceData?.floorAsk?.price?.amount?.usd),
      tokenId: nftInfo?.tokenId,
    };
    setOfferOrListModalContent(offerData);
  };

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
          <LuRefreshCw />
        </div>
      </div>
      <div className="nft_header_button_holder">
        <SolidButton
          text="Buy Now"
          onClick={() => triggerModal(setShowConfirmationModal)}
        />
        <OutlineButton text="Make Offer" onClick={makeOffer} />
      </div>
    </div>
  );
};

export default NftHeader;
