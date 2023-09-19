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
      className={`ms_mp_cards_holder ${
        showFilters ? "ms_mp_small_cards_holder" : "ms_mp_large_cards_holder"
      } ${
        minimalCards
          ? "ms_mp_small_cards_holder_minmax_v1"
          : "ms_mp_small_cards_holder_minmax_v2"
      }`}
    >
      {nftsList}
    </div>
  );
};

export default CardsHolder;
