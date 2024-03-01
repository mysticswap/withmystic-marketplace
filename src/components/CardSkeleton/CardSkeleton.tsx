import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./CardSkeleton.css";
import "react-loading-skeleton/dist/skeleton.css";

type props = {
  cards: number;
};
const CardSkeleton = ({ cards }: props) => {
  return Array(cards)
    .fill(0)
    .map((_item, index) => (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="nft_card_skeleton" key={index}>
          <Skeleton className="skeleton_img" />
          <Skeleton className="text_skeleton" width={"90%"} />
          <Skeleton className="text_skeleton" width={"40%"} />
          <Skeleton className="text_skeleton" width={"40%"} />
        </div>
      </SkeletonTheme>
    ));
};
export default CardSkeleton;
