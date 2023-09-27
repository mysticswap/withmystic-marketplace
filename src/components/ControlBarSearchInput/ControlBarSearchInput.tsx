import { IoSearchSharp } from "react-icons/io5";
import "./ControlBarSearchInput.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import {
  getCollectionNfts,
  getSingleNft,
} from "../../services/marketplace-api";
import { apiKey } from "../../config";

const ControlBarSearchInput = () => {
  const { collectionMetadata, chainId, setCollectionNfts, setNftsPageKey } =
    useGlobalContext()!;
  const contractAddress = collectionMetadata?.address;
  const onSearch = (id: string) => {
    getSingleNft(contractAddress!, id!, chainId, apiKey).then((result) => {
      setCollectionNfts([result]);
    });

    if (!id) {
      getCollectionNfts(contractAddress!, chainId, "1", apiKey).then(
        (result) => {
          setCollectionNfts(result.nfts);
          setNftsPageKey(result.pageKey);
        }
      );
    }
  };

  return (
    <div className="control_bar_search">
      <input
        type="number"
        placeholder="Search by Token ID"
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
      <IoSearchSharp size={20} />
    </div>
  );
};

export default ControlBarSearchInput;
