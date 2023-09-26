import OutlineButton from "../../../../components/OutlineButton/OutlineButton";
import SolidButton from "../../../../components/SolidButton/SolidButton";
import { SingleNftData } from "../../../../types/alchemy.types";
import { truncateAddress } from "../../../../utils";
import "./NftHeader.css";
import { IoShareSocial } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";

type Props = {
  nftData: SingleNftData;
  owner: string;
  setConfirmationModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const NftHeader = ({ nftData, owner, setConfirmationModal }: Props) => {
  const collectionName = nftData?.contract?.name;
  const nftName = nftData?.rawMetadata?.name;
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
          onClick={() => setConfirmationModal(true)}
        />
        <OutlineButton text="Make Offer" />
      </div>
    </div>
  );
};

export default NftHeader;
