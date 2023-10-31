import { NftAttributes } from "../../../../types/reservoir-types/collection-nfts.types";
import "./TraitsHolder.css";

type Props = { attributes: NftAttributes[] | undefined; tokenCount: number };

const TraitsHolder = ({ attributes, tokenCount }: Props) => {
  const traitList = attributes?.map((trait) => {
    const traitPercentage = (trait.tokenCount / tokenCount) * 100;
    const formatedTraitPercentage =
      traitPercentage % 1 > 0
        ? traitPercentage.toFixed(1)
        : traitPercentage.toFixed(0);
    return (
      <div className="trait" key={trait.key}>
        <p>{trait.key}</p>
        <p>{trait.value}</p>
        <p>{formatedTraitPercentage}% have this trait</p>
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
