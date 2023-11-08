import "./CardsHolder.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import NftCard from "../NftCard/NftCard";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import SelectedFilter from "../SelectedFilter/SelectedFilter";
import { useEffect, useRef, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { getCollectionNftsV2 } from "../../services/api/marketplace-reservoir-api";
import { generateAttributeString } from "../../utils";

const CardsHolder = () => {
  const {
    collectionNfts,
    setCollectionNfts,
    minimalCards,
    collectionChainId,
    collectionContract,
  } = useGlobalContext();
  const {
    showFilters,
    selectedTraits,
    setSelectedTraits,
    isFetching,
    selectedDropdownOption,
    setIsFetching,
    numericFilters,
  } = useHomeContext()!;

  const [nftsTemp, setNftsTemp] = useState(collectionNfts.tokens);

  const cardsHolderRef = useRef(null);

  const removeSelectedFilter = (trait: string, traitType: string) => {
    const selectedTraitsUpdate = selectedTraits.filter((item) => {
      return !(item.value == trait && item.type == traitType);
    });
    setSelectedTraits(selectedTraitsUpdate);
  };

  const clearAllFilters = () => {
    setSelectedTraits([]);
  };

  useEffect(() => {
    setNftsTemp(collectionNfts.tokens);
  }, [collectionNfts]);

  const nftsList = nftsTemp?.map((nft) => {
    return <NftCard key={nft?.token?.tokenId} nft={nft} />;
  });

  const selectedTraitList = selectedTraits.map((trait, index) => {
    return (
      <SelectedFilter
        key={index}
        trait={trait.value}
        traitType={trait.type}
        handleClick={removeSelectedFilter}
      />
    );
  });

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = cardsHolderRef.current!;
    const isAtBottom = scrollTop + clientHeight - scrollHeight >= -1;
    const attributeString = generateAttributeString(selectedTraits);

    if (isAtBottom && collectionNfts.continuation) {
      setIsFetching(true);
      getCollectionNftsV2(
        collectionChainId,
        selectedDropdownOption.value,
        selectedDropdownOption.order,
        collectionContract,
        collectionNfts.continuation,
        attributeString,
        undefined,
        numericFilters
      )
        .then((result) => {
          setCollectionNfts({
            tokens: [...collectionNfts.tokens, ...result.tokens],
            continuation: result.continuation,
          });
        })
        .finally(() => {
          setIsFetching(false);
        });
    }
  };

  useEffect(() => {
    const attributeString = generateAttributeString(selectedTraits);
    setCollectionNfts({ tokens: [], continuation: null });
    setIsFetching(true);
    getCollectionNftsV2(
      collectionChainId,
      selectedDropdownOption.value,
      selectedDropdownOption.order,
      collectionContract,
      undefined,
      attributeString,
      undefined,
      numericFilters
    ).then((result) => {
      setCollectionNfts(result);
      setIsFetching(false);
    });
  }, [selectedTraits]);

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
      {nftsList?.length < 1 && !isFetching && (
        <p className="no_result">No results</p>
      )}
    </div>
  );
};

export default CardsHolder;
