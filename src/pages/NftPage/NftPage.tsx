import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect, useState } from "react";
import { getSingleNft } from "../../services/marketplace-api";
import { apiKey } from "../../config";
import "./NftPage.css";
import { SingleNftData } from "../../types/alchemy.types";
import TraitsHolder from "./Components/TraitsHolder/TraitsHolder";
import DescriptionHolder from "./Components/DescriptionHolder/DescriptionHolder";
import NftHeader from "./Components/NftHeader/NftHeader";
import CurrentPrice from "./Components/CurrentPrice/CurrentPrice";
import Offers from "./Components/Offers/Offers";
import Details from "./Components/Details/Details";
import History from "./Components/History/History";
import Loading from "../../components/Loading/Loading";

const NftPage = () => {
  const { collectionMetadata } = useGlobalContext()!;
  const { id } = useParams();
  const contractAddress = collectionMetadata?.address;
  const [nftData, setNftData] = useState<SingleNftData>({} as SingleNftData);
  const [isLoading, setIsLoading] = useState(true);
  const nftImage = nftData?.media?.[0]?.gateway;
  const attributes = nftData?.rawMetadata?.attributes;
  const description = nftData?.description;

  useEffect(() => {
    Promise.all([
      getSingleNft(contractAddress!, id!, 1, apiKey).then((result) => {
        setNftData(result);
      }),
    ]).then(() => {
      setIsLoading(false);
    });
  }, [collectionMetadata]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div className="nft_page_top">
        <section className="nft_page_section">
          <img className="nft_image" src={nftImage} alt="" />
          <TraitsHolder attributes={attributes} />
          <DescriptionHolder description={description} />
        </section>
        <section className="nft_page_section">
          <NftHeader nftData={nftData} />
          <CurrentPrice />
          <Offers />
          <Details nftData={nftData} />
        </section>
      </div>
      <History />
    </>
  );
};

export default NftPage;
