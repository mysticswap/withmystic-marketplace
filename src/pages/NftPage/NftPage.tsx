import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/GlobalContext";
import { useEffect } from "react";
import { getSingleNft } from "../../services/marketplace-api";
import { apiKey } from "../../config";

const NftPage = () => {
  const { collectionMetadata } = useGlobalContext()!;
  const { id } = useParams();
  const contractAddress = collectionMetadata?.address;

  useEffect(() => {
    getSingleNft(contractAddress!, id!, 1, apiKey);
  }, [collectionMetadata]);

  return <div>NftPage</div>;
};

export default NftPage;
