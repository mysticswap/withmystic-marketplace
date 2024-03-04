import "./Banner.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

type IProps = {
  activity: boolean
  displayCollectionAvatar: boolean
  height?:string
}

const Banner = ({ displayCollectionAvatar }:IProps) => {
  const {
    client,
    collectionMetadata
  } = useGlobalContext();

  return (
    <div className="banner-wrapper">
      {displayCollectionAvatar && <img src={collectionMetadata?.collections?.[0]?.image} className="collection-avatar"/>}
      <div className="banner">
        <img src={collectionMetadata?.collections?.[0]?.banner  || client.bannerUrl} alt="" />
      </div>
    </div>
  );
};

export default Banner;
