import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./CardSkeleton.css";
import "react-loading-skeleton/dist/skeleton.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

type props = {
  cards: number;
};
const CardSkeleton = ({ cards }: props) => {
  const { listView } = useGlobalContext();
  return Array(cards)
    .fill(0)
    .map((_item, index) => (
      <div
        className={`${!listView ? "nft_card_skeleton" : "nft_list_skeleton"}`}
        key={index}
      >
        <SkeletonTheme baseColor="#d9e0ec3d" highlightColor="#d9e0ec76">
          <Skeleton className={`${!listView ? "skeleton_img" : "hide"}`} />
          <Skeleton
            className="text_skeleton"
            width={`${!listView ? "90%" : "95%"}`}
          />
          <Skeleton
            count={!listView ? 2 : 4}
            className="text_skeleton"
            width={`${!listView ? "40%" : "95%"}`}
          />
        </SkeletonTheme>
      </div>
    ));
};
export default CardSkeleton;
