import "./CollectionsSection.css";
import NftCard from "../NftCard/NftCard";
import { TokenElement } from "../../types/rsv-types/collection-nfts.types";

interface IProps {
  title: string;
  collections: Array<TokenElement>;
}

export const CollectionsSection = ({ title, collections }: IProps) => {


  return (
    <div className="colletions_section_container">
      <h1 className="collections_section_title">{title}</h1>
      <div className="collections_section_grid">
        {collections?.map((nft) => {
          return <NftCard key={nft?.token?.tokenId} nft={nft} />;
        })}
      </div>
    </div>
  );
};
