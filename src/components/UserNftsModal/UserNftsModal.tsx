import { IoClose } from "react-icons/io5";
import "./UserNftsModal.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import NftCard from "../NftCard/NftCard";
import { TokenElement } from "../../types/reservoir-types/collection-nfts.types";

const UserNftsModal = () => {
  const { userNfts } = useGlobalContext()!;
  return (
    <div className="modal_parent">
      <div className="modal_content user_nfts_content">
        <p className="user_nfts_title">Available NFTs</p>
        <IoClose
          className="modal_closer"
          display="block"
          size={25}
          onClick={() => {}}
        />
        <p>Choose which NFTs you want to list.</p>

        <div className="user_nfts_container">
          {userNfts?.tokens?.map((nft: unknown) => {
            return <NftCard nft={nft as TokenElement} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default UserNftsModal;
