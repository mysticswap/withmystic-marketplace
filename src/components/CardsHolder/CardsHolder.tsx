import "./CardsHolder.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import NftCard from "../NftCard/NftCard";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import SelectedFilter from "../SelectedFilter/SelectedFilter";

const CardsHolder = () => {
  const { collectionNfts } = useGlobalContext()!;
  const { showFilters, minimalCards, selectedTraits, setSelectedTraits } =
    useHomeContext()!;

  const removeSelectedFilter = (trait: string) => {
    const selectedTraitsUpdate = selectedTraits.filter((item) => {
      return item !== trait;
    });
    setSelectedTraits(selectedTraitsUpdate);
  };

  const clearAllFilters = () => {
    setSelectedTraits([]);
  };

  const nftsList = collectionNfts.map((nft) => {
    return <NftCard key={nft.tokenId} nft={nft} />;
  });

  const selectedTraitList = selectedTraits.map((trait) => {
    return (
      <SelectedFilter
        key={trait}
        trait={trait}
        handleClick={removeSelectedFilter}
      />
    );
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
      {selectedTraits.length > 0 && (
        <div className="selected_traits_holder">
          {selectedTraitList}{" "}
          <button className="clear_filters" onClick={clearAllFilters}>
            Clear filters
          </button>
        </div>
      )}
      {nftsList}
    </div>
  );
};

export default CardsHolder;
