import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { useEffect, useState } from "react";
import { getNftHistory, getSingleNft } from "../../services/marketplace-api";
import { API_KEY } from "../../config";
import "./NftPage.css";
import { SingleNftData, SingleNftHistory } from "../../types/alchemy.types";
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
  getNftOffers,
  getSingleNftV2,
} from "../../services/marketplace-reservoir-api";
import { GetNftsReservoir } from "../../types/reservoir-types/collection-nfts.types";
import { NftOffers } from "../../types/reservoir-types/nft-offers.types";

const NftPage = () => {
  const { collectionMetadata, chainId } = useGlobalContext()!;
  const { id } = useParams();

  const [nftData, setNftData] = useState<SingleNftData>({} as SingleNftData);
  const [nftDataV2, setNftDataV2] = useState({} as GetNftsReservoir);
  const [nftOffers, setNftOffers] = useState({} as NftOffers);

  const [isLoading, setIsLoading] = useState(true);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showOfferOrListingModal, setShowOfferOrListingModal] = useState(false);
  const [nftHistory, setNftHistory] = useState<SingleNftHistory>(
    {} as SingleNftHistory
  );

  const contractAddress = collectionMetadata?.collections[0].primaryContract;

  const nftInfo = nftDataV2?.tokens?.[0]?.token;
  const nftPriceData = nftDataV2?.tokens?.[0]?.market;

  const nftImage = nftInfo?.image;
  const description = nftInfo?.description;
  const attributes = nftInfo?.attributes;
  const tokenCount = nftInfo?.collection?.tokenCount;

  useEffect(() => {
    Promise.all([
      getSingleNft(contractAddress!, id!, 1, API_KEY).then((result) => {
        setNftData(result);
      }),

      getSingleNftV2(chainId, `${contractAddress}:${id}`).then((result) => {
        setNftDataV2(result);
      }),

      getNftOffers(chainId, `${contractAddress}:${id}`).then((result) => {
        setNftOffers(result);
      }),

      getNftHistory(contractAddress!, id!, 1, API_KEY).then((result) => {
        setNftHistory(result);
      }),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [collectionMetadata]);

  if (isLoading) {
    return <Loading />;
  }
  // tt
  return (
    <>
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

      <History nftHistory={nftHistory} />

      {showConfirmationModal && (
        <ConfirmPurchaseModal
          nft={nftData}
          setShowConfirmationModal={setShowConfirmationModal}
        />
      )}

      {showOfferOrListingModal && (
        <OfferOrListingModal
          isOffer={true}
          nft={nftData}
          setShowOfferOrListingModal={setShowOfferOrListingModal}
        />
      )}
    </>
  );
};

export default NftPage;
