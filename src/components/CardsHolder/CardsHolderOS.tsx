import "./CardsHolder.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import NftCard from "../NftCard/NftCard";
// import NftCard2 from "../NftCard/NftCard2";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import SelectedFilter from "../SelectedFilter/SelectedFilter";
import { useEffect, useRef, useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import { getCollectionNftsV2 } from "../../services/api/marketplace-reservoir-api";
import { generateAttributeString } from "../../utils";
import NftCardOS from "../NftCard/NftCardOS";

const CardsHolderOS = () => {
  const {
    collectionNfts,
    setCollectionNfts,
    minimalCards,
    collectionChainId,
    collectionContract,
    nftsInCollectionOS,
    // setNftsInCollection,
  } = useGlobalContext();
  console.log(nftsInCollectionOS);
  const {
    showFilters,
    selectedTraits,
    setSelectedTraits,
    isFetching,
    selectedDropdownOption,
    setIsFetching,
    numericFilters,
  } = useHomeContext()!;

  // console.log(collectionChainId === 1);

  // const nfts =
  //   collectionChainId === 1 ? nftsInCollection.nfts : collectionNfts.tokens;

  const [nftsTemp, setNftsTemp] = useState(collectionNfts.tokens);
  console.log(nftsTemp);
  const [nftsTempOS, setNftsTempOS] = useState(nftsInCollectionOS.nfts);
  console.log(nftsTempOS);

  // console.log(nftsTemp?.length > 0);

  // const [newNftsTemp, setNewNftTemp] = useState(nftsInCollection.nfts);
  // console.log(newNftsTemp);

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
    if (collectionNfts.tokens) {
      setNftsTemp(collectionNfts.tokens);
    }
    // if (nftsInCollection.nfts) {
    //   setNewNftTemp(nftsInCollection.nfts);
    // }
  }, [collectionNfts]);

  // let nftsList;

  // if (collectionChainId === 1) {
  //   nftsList = nftsTemp?.map((nft) => {
  //     return <NftCard key={nft?.token?.tokenId} nft={nft} />;
  //   });
  // } else {
  //   nftsList = nftsTempOS?.map((nft) => {
  //     return <NftCardOS key={nft.tokenId} nft={nft} />;
  //   });
  // }

  const nftsList = nftsTemp?.map((nft) => {
    return <NftCard key={nft?.token?.tokenId} nft={nft} />;
  });
  const nftsList2 = nftsTempOS?.map((nft) => {
    return <NftCardOS key={nft.tokenId} nft={nft} />;
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
    // getCollectionNftsV2(
    //   collectionChainId,
    //   selectedDropdownOption.value,
    //   selectedDropdownOption.order,
    //   collectionContract,
    //   undefined,
    //   attributeString,
    //   undefined,
    //   numericFilters
    // ).then((result) => {
    //   setCollectionNfts(result);
    //   setIsFetching(false);
    // });
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
          {selectedTraitList}
          <button className="clear_filters" onClick={clearAllFilters}>
            Clear filters
          </button>
        </div>
      )}

      {nftsTemp?.length > 0 && collectionChainId !== 1 && nftsList}
      {nftsTempOS?.length > 0 && collectionChainId === 1 && nftsList2}

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

export default CardsHolderOS;
