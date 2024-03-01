import "./CollectionsSection.css";
import CollectionCard from "../CollectionCard/CollectionCard";
import { ICollection } from "../../pages/Collections/types";

interface IProps {
  title: string;
  collections: Array<ICollection>;
}

export const CollectionsSection = ({ title, collections }: IProps) => {


  return (
    <div className="colletions_section_container">
      <h1 className="collections_section_title">{title}</h1>
      <div className="collections_section_grid">
        {collections?.map((collection, index) => {
          return <CollectionCard key={index} collection={collection} />;
        })}
      </div>
    </div>
  );
};
