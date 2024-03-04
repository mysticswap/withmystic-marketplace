import "./Banner.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

type IProps = {
  activity: boolean
  displayCollectionAvatar: boolean
  height?:number
}

const Banner = ({ displayCollectionAvatar, height = 70 }:IProps) => {
  const {
    client,
    collectionMetadata
  } = useGlobalContext();

  return (
    <div className="banner-wrapper">
      {displayCollectionAvatar && <img src={collectionMetadata?.collections?.[0]?.image}  className="collection-avatar"/>}
      <div className="banner">
        <img src={collectionMetadata?.collections?.[0]?.banner  || client.bannerUrl} alt="" style={{height: `${height}vh`}} />
      </div>
    </div>
  );
};

export default Banner;
