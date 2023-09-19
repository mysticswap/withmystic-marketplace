import React from 'react';
import './NftCard.css';
import { SingleNftData } from '../../types/alchemy.types';
import { VscVerifiedFilled } from 'react-icons/vsc';
import CustomTooltip from '../CustomTooltip/CustomTooltip';

type Props = { nft: SingleNftData };

const NftCard = ({ nft }: Props) => {
  const handleClick = () => {
    window.location.href = `${nft.contract.name}/${nft.tokenId}`;
  };
  return (
    <div className="ms_mp_nft_card">
      <img src={nft.media[0].gateway} alt="" />
      <div className="ms_mp_nft_card_details">
        <div className="ms_mp_card_name">
          <p onClick={handleClick}>{nft.title}</p>
          <CustomTooltip text="This collection has been verified">
            <span>
              <VscVerifiedFilled color="#3498db" display="block" size={20} />
            </span>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
