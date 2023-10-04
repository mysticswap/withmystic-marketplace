import OutlineButton from "../../../../components/OutlineButton/OutlineButton";
import SolidButton from "../../../../components/SolidButton/SolidButton";
import { useGlobalContext } from "../../../../context/GlobalContext/GlobalContext";
import { connectWallets } from "../../../../services/web3Onboard";
import { TokenToken } from "../../../../types/reservoir-types/collection-nfts.types";
import { truncateAddress } from "../../../../utils";
import "./NftHeader.css";
import { IoShareSocial } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

type Props = {
  nftInfo: TokenToken;
  setShowConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowOfferOrListingModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NftHeader = ({
  setShowConfirmationModal,
  setShowOfferOrListingModal,
  nftInfo,
}: Props) => {
  const { user, setProvider } = useGlobalContext()!;
  const collectionName = nftInfo?.collection?.name;
  const nftName = nftInfo?.name;
  const owner = nftInfo?.owner;

  const triggerModal = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    !user ? connectWallets(setProvider) : setter(true);
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
        <OutlineButton
          text="Make Offer"
          onClick={() => triggerModal(setShowOfferOrListingModal)}
        />
      </div>
    </div>
  );
};

export default NftHeader;
