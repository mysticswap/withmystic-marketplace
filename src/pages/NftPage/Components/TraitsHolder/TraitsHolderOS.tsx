import { Attribute } from "../../../../types/alchemy.types";
import "./TraitsHolder.css";

// type Props = { attributes: NftAttributes[] | undefined; tokenCount: number };

// Props for the TraitsHolder component
interface Props {
  attributes: Attribute[];
}

const TraitsHolderOS = ({ attributes }: Props) => {
  const traitList = attributes?.map((trait) => {
    // Handle different types of attributes
    const traitKey = trait.trait_type;
    const traitValue = trait.value;

    return (
      <div className="trait" key={traitKey}>
        <p>{traitKey}</p>
        <p>{traitValue}</p>
      </div>
    );
  });
  return (
    <div className="traits_holder">
      <p className="holder_title">Traits</p>
      <div className="traits_parent">{traitList}</div>
    </div>
  );
};

export default TraitsHolderOS;
