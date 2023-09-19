import "./CardsHolder.css";
import { useGlobalContext } from "../../context/GlobalContext";
import NftCard from "../NftCard/NftCard";
import { useHomeContext } from "../../context/HomeContext";

const CardsHolder = () => {
  const { collectionNfts } = useGlobalContext()!;
  const { showFilters, minimalCards } = useHomeContext()!;

  const nftsList = collectionNfts.map((nft) => {
    return <NftCard key={nft.tokenId} nft={nft} />;
  });

  return (
    <div
      className={`cards_holder ${
        showFilters ? "small_cards_holder" : "large_cards_holder"
      } ${
        minimalCards
          ? "small_cards_holder_minmax_v1"
          : "small_cards_holder_minmax_v2"
      }`}
    >
      {nftsList}
    </div>
  );
};

export default CardsHolder;
