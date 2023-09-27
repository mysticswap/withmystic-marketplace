import "./CardsHolder.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import NftCard from "../NftCard/NftCard";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import SelectedFilter from "../SelectedFilter/SelectedFilter";
import { useRef, useState } from "react";
import { getCollectionNfts } from "../../services/marketplace-api";
import { apiKey, collectionContract } from "../../config";
import { BiLoaderCircle } from "react-icons/bi";

const CardsHolder = () => {
  const {
    collectionNfts,
    nftsPageKey,
    setNftsPageKey,
    chainId,
    setCollectionNfts,
  } = useGlobalContext()!;
  const { showFilters, minimalCards, selectedTraits, setSelectedTraits } =
    useHomeContext()!;

  const [isFetching, setIsFetching] = useState(false);

  const cardsHolderRef = useRef(null);

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
    return <NftCard key={nft?.tokenId} nft={nft} />;
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

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = cardsHolderRef.current!;
    // const isAtBottom = scrollTop + clientHeight == scrollHeight;
    // const isAtBottom = (scrollTop + clientHeight) % scrollHeight < 1;
    const isAtBottom = scrollTop + clientHeight - scrollHeight >= -1;

    if (isAtBottom) {
      setIsFetching(true);
      getCollectionNfts(collectionContract, chainId, nftsPageKey, apiKey)
        .then((result) => {
          setCollectionNfts([...collectionNfts, ...result.nfts]);
          setNftsPageKey(result.pageKey);
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  };

  return (
    <div
      ref={cardsHolderRef}
      onScroll={onScroll}
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
      {isFetching && (
        <div className="loader_holder">
          <BiLoaderCircle className="loader" size={50} />
        </div>
      )}
    </div>
  );
};

export default CardsHolder;
