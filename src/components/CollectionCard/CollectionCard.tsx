import "./CollectionCard.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { SiOpensea } from "react-icons/si";
import { ICollection } from "../../pages/Collections/types";
import ethereumIcon from "./../../assets/ethereum-1.svg";
import checkIcon from "./../../assets/checkSign.png";
type Props = { collection: ICollection };

const CollectionCard = ({ collection }: Props) => {


  const nameRef = useRef(null);

  const nameLink = (
    <Link to={`/${collection.id}`}>
      <p ref={nameRef}>{collection.collection}</p>
    </Link>
  );

  return (
    <div className="collection_card">
      <div className="collection_card_image_area">
          <Link to={`/collection/${collection.id}`}>
            <picture>
              <source
                srcSet={` https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840 250w,
                https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840 512w,
                https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840 1000w`}
                sizes="250px"
              />
              <img
                loading="lazy"
                decoding="async"
                src="https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840"
                alt={`A collection image`}
                role="img"
                className="collection-cover-image"
              />
            </picture>
          </Link>
      </div>

      <div className="collection_card_details">
        <div className="card_name">
          <CustomTooltip text={collection.collection}>{nameLink}</CustomTooltip>
          <img className="collection-card-check-icon" src={checkIcon}/>
        </div>
          <div className="floor-info-container">
            <span className="collection-floor-label">Floor</span>
            <div className="flor-info-value">
              <img className="collection-card-ethereum-icon" src={ethereumIcon}/>
              <span>11.7</span>
            </div>
          </div>
          <button>
              Enter Collection
          </button>
      </div>

      <div className="source_icon">
        <a href="https://opensea.io/collection/mystical-wizards">
            <SiOpensea display="block" color="#3498db" size={20} />
        </a>
      </div>
    </div>
  );
};

export default CollectionCard;
