import React from 'react';
import './CardsHolder.css';
import { useGlobalContext } from '../../context/GlobalContext';
import NftCard from '../NftCard/NftCard';

const CardsHolder = () => {
  const {
    collectionNftsState,
    showFilters,
    minimalCards,
  } = useGlobalContext()!;
  const { collectionNfts } = collectionNftsState;
  const nftsList = collectionNfts.map(nft => {
    return <NftCard key={nft.tokenId} nft={nft} />;
  });
  return (
    <div
      className={`ms_mp_cards_holder ${
        showFilters ? 'ms_mp_small_cards_holder' : 'ms_mp_large_cards_holder'
      } ${
        minimalCards
          ? 'ms_mp_small_cards_holder_minmax_v1'
          : 'ms_mp_small_cards_holder_minmax_v2'
      }`}
    >
      {nftsList}
    </div>
  );
};

export default CardsHolder;
