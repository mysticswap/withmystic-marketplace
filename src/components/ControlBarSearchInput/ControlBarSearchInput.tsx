import { IoSearchSharp } from "react-icons/io5";
import "./ControlBarSearchInput.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import {
  getCollectionNfts,
  getSingleNft,
} from "../../services/marketplace-api";
import { API_KEY } from "../../config";

const ControlBarSearchInput = () => {
  const { chainId, setCollectionNfts, setNftsPageKey, collectionMetadata } =
    useGlobalContext()!;
  const contractAddress = collectionMetadata?.collections?.[0]?.primaryContract;
  const onSearch = (id: string) => {
    getSingleNft(contractAddress!, id!, chainId, API_KEY).then((result) => {
      setCollectionNfts([result]);
    });

    if (!id) {
      getCollectionNfts(contractAddress!, chainId, "1", API_KEY).then(
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
