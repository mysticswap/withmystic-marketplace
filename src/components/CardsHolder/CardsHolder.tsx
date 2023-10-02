import "./CardsHolder.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import NftCard from "../NftCard/NftCard";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import SelectedFilter from "../SelectedFilter/SelectedFilter";
import { useEffect, useRef, useState } from "react";
import { collectionContract } from "../../config";
import { BiLoaderCircle } from "react-icons/bi";
import { getCollectionNftsV2 } from "../../services/marketplace-reservoir-api";
import { generateAttributeString } from "../../utils";

const CardsHolder = () => {
  const { chainId, collectionNfts, setCollectionNfts } = useGlobalContext()!;
  const { showFilters, minimalCards, selectedTraits, setSelectedTraits } =
    useHomeContext()!;

  const [isFetching, setIsFetching] = useState(false);
  const [nftsTemp, setNftsTemp] = useState(collectionNfts.tokens);

  const cardsHolderRef = useRef(null);

  const removeSelectedFilter = (trait: string) => {
    const selectedTraitsUpdate = selectedTraits.filter((item) => {
      return item.value !== trait;
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
        handleClick={removeSelectedFilter}
      />
    );
  });

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = cardsHolderRef.current!;
    // const isAtBottom = scrollTop + clientHeight == scrollHeight;
    // const isAtBottom = (scrollTop + clientHeight) % scrollHeight < 1;
    const isAtBottom = scrollTop + clientHeight - scrollHeight >= -1;
    const attributeString = generateAttributeString(selectedTraits);

    if (isAtBottom && collectionNfts.continuation) {
      setIsFetching(true);
      getCollectionNftsV2(
        chainId,
        collectionContract,
        collectionNfts.continuation,
        attributeString
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
      chainId,
      collectionContract,
      undefined,
      attributeString
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
    </div>
  );
};

export default CardsHolder;
