import { useRef } from "react";
import { UserTokenElement } from "../../types/rsv-types/user-nfts.types";
import "./UserNftCard.css";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { useIsOverflow } from "../../hooks/useIsOverflow";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import { getTransactionNft } from "../../utils/transaction-nft.utils";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";

type Props = {
  nft: UserTokenElement;
  setShowUserNftsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserNftCard = ({ nft, setShowUserNftsModal }: Props) => {
  const { user } = useConnectionContext()!;
  const { setTransactionNft, setShowOfferOrListingModal } =
    useTransactionContext()!;
  const nameRef = useRef(null);
  const isOverflowing = useIsOverflow(nameRef);

  const nftName = nft?.token?.name;
  // const rarityRank = nft?.token?.rarityRank;

  const handleClick = () => {
    setShowUserNftsModal(false);
    const isOffer = false;
    const isSale = false;
    const transactionMessage = `I’ve just listed ${nftName} for sale! Any takers?`;
    const transactionNft = getTransactionNft(
      nft,
      isOffer,
      isSale,
      transactionMessage,
      user!,
      0,
      0
    );
    setTransactionNft(transactionNft);
    setShowOfferOrListingModal(true);
  };

  return (
    <div className="nft_card user_nft_card" onClick={handleClick}>
      <img src={nft?.token?.image} alt="" />

      <div className="nft_card_details">
        <div className="card_name">
          {isOverflowing ? (
            <CustomTooltip text={nftName}>
              <p ref={nameRef}>{nftName}</p>
            </CustomTooltip>
          ) : (
            <p ref={nameRef}>{nftName}</p>
          )}
        </div>
        <p className="user_nft_card_rarity">#{nft.token.tokenId}</p>
      </div>
    </div>
  );
};

export default UserNftCard;
