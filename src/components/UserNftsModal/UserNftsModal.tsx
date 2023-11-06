import { IoClose } from "react-icons/io5";
import "./UserNftsModal.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import UserNftCard from "../UserNftCard/UserNftCard";
import { useState } from "react";
import { getUserNfts } from "../../services/api/marketplace-reservoir-api";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { BiLoaderCircle } from "react-icons/bi";

type Props = {
  setShowUserNftsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserNftsModal = ({ setShowUserNftsModal }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { userNfts, setUserNfts, collectionChainId, collectionContract } =
    useGlobalContext()!;
  const { user } = useConnectionContext()!;

  const fetchMore = () => {
    setIsLoading(true);
    getUserNfts(
      collectionChainId,
      user!,
      collectionContract,
      userNfts.continuation!
    )
      .then((result) => {
        setUserNfts({
          tokens: [...userNfts.tokens, ...result.tokens],
          continuation: result.continuation,
        });
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="modal_parent">
      <div className="modal_content user_nfts_content">
        <p className="user_nfts_title">Available NFTs</p>
        <IoClose
          className="modal_closer"
          display="block"
          size={25}
          onClick={() => setShowUserNftsModal(false)}
        />
        <p>Choose which NFTs you want to list.</p>

        <div className="user_nfts_container">
          {userNfts?.tokens?.map((nft) => {
            return (
              <UserNftCard
                key={nft.token.tokenId}
                nft={nft}
                setShowUserNftsModal={setShowUserNftsModal}
              />
            );
          })}
        </div>

        {userNfts.continuation && !isLoading && (
          <button className="user_nfts_load_btn" onClick={fetchMore}>
            Load More
          </button>
        )}

        {isLoading && <BiLoaderCircle className="loader" size={50} />}
      </div>
    </div>
  );
};

export default UserNftsModal;
