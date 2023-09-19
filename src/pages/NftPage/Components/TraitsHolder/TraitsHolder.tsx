import { Attribute } from "../../../../types/alchemy.types";
import "./TraitsHolder.css";

type Props = { attributes: Attribute[] };

const TraitsHolder = ({ attributes }: Props) => {
  const traitList = attributes?.map((trait) => {
    return (
      <div className="trait" key={trait.trait_type}>
        <p>{trait.trait_type}</p>
        <p>{trait.value}</p>
        <p>10% have this trait</p>
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

export default TraitsHolder;
