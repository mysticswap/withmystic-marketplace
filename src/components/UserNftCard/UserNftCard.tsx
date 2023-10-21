import { useRef } from "react";
import { UserTokenElement } from "../../types/reservoir-types/user-nfts.types";
import "./UserNftCard.css";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { useIsOverflow } from "../../hooks/useIsOverflow";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { OfferOrListUiData } from "../../context/GlobalContext/types";

type Props = {
  nft: UserTokenElement;
  setShowUserNftsModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserNftCard = ({ nft, setShowUserNftsModal }: Props) => {
  const { setOfferOrListModalContent, setShowOfferOrListingModal } =
    useGlobalContext()!;
  const nameRef = useRef(null);
  const isOverflowing = useIsOverflow(nameRef);

  const nftName = nft?.token?.name;
  const rarityRank = nft?.token?.rarityRank;

  const handleClick = () => {
    setShowUserNftsModal(false);
    const listData: OfferOrListUiData = {
      collectionName: nft.token.collection.name,
      nftName: nft.token.name,
      nftImage: nft.token.image,
      isOffer: false,
      amount: nft?.token?.lastSale?.price?.amount?.decimal!,
      price: nft?.token?.lastSale?.price?.amount?.usd!,
    };
    setOfferOrListModalContent(listData);
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
        <p className="user_nft_card_rarity">#{rarityRank}</p>
      </div>
    </div>
  );
};

export default UserNftCard;
