import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useEffect, useState } from "react";
import "./NftPage.css";
import TraitsHolder from "./Components/TraitsHolder/TraitsHolder";
import DescriptionHolder from "./Components/DescriptionHolder/DescriptionHolder";
import NftHeader from "./Components/NftHeader/NftHeader";
import CurrentPrice from "./Components/CurrentPrice/CurrentPrice";
import Offers from "./Components/Offers/Offers";
import Details from "./Components/Details/Details";
import History from "./Components/History/History";
import Loading from "../../components/Loading/Loading";
import ConfirmPurchaseModal from "../../components/ConfirmPurchaseModal/ConfirmPurchaseModal";
import OfferOrListingModal from "../../components/OfferOrListingModal/OfferOrListingModal";
import {
  getNftActivity,
  getNftOffers,
  getSingleNftV2,
} from "../../services/marketplace-reservoir-api";
import { GetNftsReservoir } from "../../types/reservoir-types/collection-nfts.types";
import { NftOffers } from "../../types/reservoir-types/nft-offers.types";
import { reservoirActivityTypes } from "../../constants";
import { CollectionActivity as NftActivity } from "../../types/reservoir-types/collection-activity.types";
import FlaggedWarning from "./Components/FlaggedWarning/FlaggedWarning";

const NftPage = () => {
  const { collectionMetadata, chainId } = useGlobalContext()!;
  const { id } = useParams();

  const [nftDataV2, setNftDataV2] = useState({} as GetNftsReservoir);
  const [nftOffers, setNftOffers] = useState({} as NftOffers);
  const [nftActivity, setNftActivity] = useState({} as NftActivity);

  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showOfferOrListingModal, setShowOfferOrListingModal] = useState(false);

  const contractAddress = collectionMetadata?.collections[0].primaryContract;

  const nftInfo = nftDataV2?.tokens?.[0]?.token;
  const nftPriceData = nftDataV2?.tokens?.[0]?.market;

  const nftImage = nftInfo?.image;
  const description = nftInfo?.description;
  const attributes = nftInfo?.attributes;
  const tokenCount = nftInfo?.collection?.tokenCount;
  const token = `${contractAddress}:${id}`;

  useEffect(() => {
    Promise.all([
      getSingleNftV2(chainId, token).then((result) => {
        setNftDataV2(result);
      }),

      getNftOffers(chainId, token).then((result) => {
        setNftOffers(result);
      }),

      getNftActivity(chainId, token, reservoirActivityTypes).then((result) =>
        setNftActivity(result)
      ),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [collectionMetadata]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {nftInfo.isFlagged && <FlaggedWarning />}
      <div className="nft_page_top">
        <section className="nft_page_section">
          <img className="nft_image" src={nftImage} alt="" />
          <TraitsHolder attributes={attributes!} tokenCount={tokenCount} />
          <DescriptionHolder description={description} />
        </section>
        <section className="nft_page_section">
          <NftHeader
            nftInfo={nftInfo}
            setShowConfirmationModal={setShowConfirmationModal}
            setShowOfferOrListingModal={setShowOfferOrListingModal}
          />
          <CurrentPrice nftPriceData={nftPriceData} />
          <Offers
            nftOffers={nftOffers}
            tokenId={id!}
            setNftOffers={setNftOffers}
          />
          <Details nftInfo={nftInfo} />
        </section>
      </div>

      <History
        nftActivity={nftActivity}
        token={token}
        setNftActivity={setNftActivity}
      />

      {showConfirmationModal && (
        <ConfirmPurchaseModal
          nft={nftInfo}
          nftMarketInfo={nftPriceData}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}

      {showOfferOrListingModal && (
        <OfferOrListingModal
          isOffer={true}
          nft={nftInfo}
          nftMarketInfo={nftPriceData}
          setShowOfferOrListingModal={setShowOfferOrListingModal}
        />
      )}
    </>
  );
};

export default NftPage;
