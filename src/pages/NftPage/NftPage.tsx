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
import { useIsMobile } from "../../hooks/useIsMobile";
import NotFound from "./Components/NotFound/NotFound";
import { convertToIPFSImage } from "../../utils";
import { useEffect, useState } from "react";
import { getSingleNft } from "../../services/api/marketplace-api";
import { SingleNftOS } from "../../types/reservoir-types/collection-nfts.types";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import TraitsHolderOS from "./Components/TraitsHolder/TraitsHolderOS";
import NftHeaderOS from "./Components/NftHeader/NftHeaderOS";
import DetailsOS from "./Components/Details/DetailsOS";
import HistoryOS from "./Components/History/HistoryOS";
import SocialShareOS from "../../components/SocialShare/SocialShareOS";
import { TokenMedia, useTokens } from "@reservoir0x/reservoir-kit-ui";

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
    nftDataV2,
    nftDataOS,
    ownerOfNFT,
    nftHistory,
    setNftHistory,
    // isLoadingOS,
  } = useNftPageContext()!;
  console.log(nftDataV2);
  const {
    showOfferOrListingModal,
    setShowOfferOrListingModal,
    showConfirmationModal,
    setShowConfirmationModal,
  } = useTransactionContext()!;
  const { collectionContract, collectionChainId } = useGlobalContext();
  const { chainId } = useConnectionContext()!;

  const contractAddress = collectionContract;

  const { data: tokens } = useTokens({
    collection: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
  });
  console.log(tokens);

  const nftImage =
    nftInfo?.image ?? convertToIPFSImage(nftDataOS?.rawMetadata?.image);
  const description = nftInfo?.description ?? nftDataOS.description;
  const attributes = nftInfo?.attributes;
  const tokenCount = nftInfo?.collection?.tokenCount;
  const token = `${contractAddress}:${id}`;

  // const { title, rawMetadata } = nftDataOS;

  // const { image } = rawMetadata;
  const imgOS = convertToIPFSImage(nftDataOS?.rawMetadata?.image);

  const isMobile = useIsMobile();

  if (isLoading) {
    return <Loading />;
  }

  // if (!nftDataV2.tokens.length || nftDataOS.metadataError) {
  //   return <NotFound />;
  // }
  if (nftDataOS.metadataError) {
    return <NotFound />;
  }

  return (
    <>
      {collectionChainId === 1 ? (
        <>
          <div className="nft_page_top">
            <section className="nft_page_section">
              <img className="nft_image" src={imgOS} alt="" />
              {isMobile && (
                <NftHeaderOS
                  nftInfo={nftInfo}
                  nftPriceData={nftPriceData}
                  setShowConfirmationModal={setShowConfirmationModal}
                  setShowOfferOrListingModal={setShowOfferOrListingModal}
                />
              )}
              {/* {isMobile && <CurrentPrice nftPriceData={nftPriceData} />} */}
              {nftDataOS!.rawMetadata.attributes!.length > 0 && (
                <TraitsHolderOS
                  attributes={nftDataOS.rawMetadata.attributes!}
                />
              )}

              <DescriptionHolder description={description} />
            </section>
            <section className="nft_page_section">
              {!isMobile && (
                <NftHeaderOS
                  nftInfo={nftInfo}
                  nftPriceData={nftPriceData}
                  setShowConfirmationModal={setShowConfirmationModal}
                  setShowOfferOrListingModal={setShowOfferOrListingModal}
                />
              )}
              {!isMobile && <CurrentPrice nftPriceData={nftPriceData} />}
              {/* <Offers
                nftOffers={nftOffers}
                tokenId={id!}
                setNftOffers={setNftOffers}
              /> */}
              <DetailsOS nftInfo={nftInfo} />
            </section>
          </div>
          <HistoryOS nftHistory={nftHistory} />
          {showShareModal && <SocialShareOS />}
        </>
      ) : (
        <>
          {nftInfo?.isFlagged && <FlaggedWarning />}
          <div className="nft_page_top">
            <section className="nft_page_section">
              <img className="nft_image" src={nftImage} alt="" />
              {isMobile && (
                <NftHeader
                  nftInfo={nftInfo}
                  nftPriceData={nftPriceData}
                  setShowConfirmationModal={setShowConfirmationModal}
                  setShowOfferOrListingModal={setShowOfferOrListingModal}
                />
              )}
              {isMobile && <CurrentPrice nftPriceData={nftPriceData} />}
              {nftInfo!.attributes!.length > 0 && (
                <TraitsHolder
                  attributes={attributes!}
                  tokenCount={tokenCount}
                />
              )}

              <DescriptionHolder description={description} />
            </section>
            <section className="nft_page_section">
              {!isMobile && (
                <NftHeader
                  nftInfo={nftInfo}
                  nftPriceData={nftPriceData}
                  setShowConfirmationModal={setShowConfirmationModal}
                  setShowOfferOrListingModal={setShowOfferOrListingModal}
                />
              )}
              {!isMobile && <CurrentPrice nftPriceData={nftPriceData} />}
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
      )}
    </>
  );
};

export default NftPage;
