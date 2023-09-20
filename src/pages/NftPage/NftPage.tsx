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

const NftPage = () => {
  const { collectionMetadata } = useGlobalContext()!;
  const { id } = useParams();
  const contractAddress = collectionMetadata?.address;
  const [nftData, setNftData] = useState<SingleNftData>({} as SingleNftData);
  const nftImage = nftData?.media?.[0]?.gateway;
  const attributes = nftData?.rawMetadata?.attributes;
  const description = nftData?.description;

  useEffect(() => {
    getSingleNft(contractAddress!, id!, 1, apiKey).then((result) => {
      setNftData(result);
    });
  }, [collectionMetadata]);

  return (
    <>
      <div className="nft_page">
        <section className="nft_page_section">
          <img className="nft_image" src={nftImage} alt="" />
          <TraitsHolder attributes={attributes} />
          <DescriptionHolder description={description} />
        </section>
        <section className="nft_page_section">
          <NftHeader nftData={nftData} />
          <CurrentPrice />
        </section>
      </div>
    </>
  );
};

export default NftPage;
