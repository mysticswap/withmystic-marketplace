import { NftAttributes } from "../../../../types/reservoir-types/collection-nfts.types";
import "./TraitsHolder.css";

// type Props = { attributes: NftAttributes[] | undefined; tokenCount: number };

// Props for the TraitsHolder component
interface Props {
  attributes: NftAttributes[];
  tokenCount: number;
}

const TraitsHolder = ({ attributes, tokenCount }: Props) => {
  const traitList = attributes?.map((trait) => {
    // Handle different types of attributes
    const traitKey = trait.key;
    const traitValue = trait.value;

    const traitPercentage = (trait.tokenCount / tokenCount) * 100;
    const formattedTraitPercentage =
      traitPercentage % 1 > 0
        ? traitPercentage.toFixed(1)
        : traitPercentage.toFixed(0);
    return (
      <div className="trait" key={traitKey}>
        <p>{traitKey}</p>
        <p>{traitValue}</p>
        <p>{formattedTraitPercentage}% have this trait</p>
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
