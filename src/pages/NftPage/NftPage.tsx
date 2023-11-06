import { useParams } from "react-router-dom";
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
import FlaggedWarning from "./Components/FlaggedWarning/FlaggedWarning";
import { useNftPageContext } from "../../context/NftPageContext/NftPageContext";
import OfferOrListingModal from "../../components/OfferOrListingModal/OfferOrListingModal";
import { useTransactionContext } from "../../context/TransactionContext/TransactionContext";
import SocialShare from "../../components/SocialShare/SocialShare";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

const NftPage = () => {
  const { id } = useParams();
  const {
    nftOffers,
    setNftOffers,
    nftActivity,
    setNftActivity,
    isLoading,
    nftInfo,
    nftPriceData,
    showShareModal,
  } = useNftPageContext()!;
  const {
    showOfferOrListingModal,
    setShowOfferOrListingModal,
    showConfirmationModal,
    setShowConfirmationModal,
  } = useTransactionContext()!;
  const { collectionContract } = useGlobalContext()!;

  const contractAddress = collectionContract;

  const nftImage = nftInfo?.image;
  const description = nftInfo?.description;
  const attributes = nftInfo?.attributes;
  const tokenCount = nftInfo?.collection?.tokenCount;
  const token = `${contractAddress}:${id}`;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {nftInfo?.isFlagged && <FlaggedWarning />}
      <div className="nft_page_top">
        <section className="nft_page_section">
          <img className="nft_image" src={nftImage} alt="" />
          <TraitsHolder attributes={attributes!} tokenCount={tokenCount} />
          <DescriptionHolder description={description} />
        </section>
        <section className="nft_page_section">
          <NftHeader
            nftInfo={nftInfo}
            nftPriceData={nftPriceData}
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
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}

      {showOfferOrListingModal && (
        <OfferOrListingModal
          setShowOfferOrListingModal={setShowOfferOrListingModal}
        />
      )}

      {showShareModal && <SocialShare />}
    </>
  );
};

export default NftPage;
