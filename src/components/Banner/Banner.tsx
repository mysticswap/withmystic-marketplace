import "./Banner.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { bannerHeight } from "../../constants";

type IProps = {
  displayCollectionAvatar: boolean
  height?: string
}

const Banner = ({ displayCollectionAvatar, height = bannerHeight.default }:IProps) => {
  const {
    client,
    collectionMetadata
  } = useGlobalContext();

  return (
    <div className="banner-wrapper">
      {displayCollectionAvatar && <img src={collectionMetadata?.collections?.[0]?.image}  className="collection-avatar"/>}
      <div className="banner">
        <img src={collectionMetadata?.collections?.[0]?.banner  || client.bannerUrl} alt="" style={{height: height}} />
      </div>
    </div>
  );
};

export default Banner;
