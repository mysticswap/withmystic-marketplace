import "./CollectionCard.css";
import { Link } from "react-router-dom";
import { useRef } from "react";
import CustomTooltip from "../CustomTooltip/CustomTooltip";
import { SiOpensea } from "react-icons/si";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useIsOverflow } from "../../hooks/useIsOverflow";
import { ICollection } from "../../pages/Collections/types";

type Props = { collection: ICollection };

const CollectionCard = ({ collection }: Props) => {
  const {
    minimalCards,
  } = useGlobalContext();

  const nameRef = useRef(null);
  const isOverflowing = useIsOverflow(nameRef, minimalCards);

  const nameLink = (
    <Link to={`/${collection.id}`}>
      <p ref={nameRef}>{collection.collection}</p>
    </Link>
  );

  return (
    <div className="nft_card">
      <div className="nft_card_image_area">
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
              />
            </picture>
          </Link>
      </div>

      <div className="nft_card_details">
        <div className="card_name">
          {isOverflowing ? (
            <CustomTooltip text={collection.collection}>{nameLink}</CustomTooltip>
          ) : (
            <>{nameLink}</>
          )}
        </div>

          <button
            onClick={()=> console.log('hellow world')}
          >
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
