import { IoSearchSharp } from "react-icons/io5";
import "./ControlBarSearchInput.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { getCollectionNftsV2 } from "../../services/marketplace-reservoir-api";
import { generateAttributeString } from "../../utils";
import { useHomeContext } from "../../context/HomeContext/HomeContext";

const ControlBarSearchInput = () => {
  const { chainId, setCollectionNfts, collectionMetadata } =
    useGlobalContext()!;
  const { selectedTraits, setIsFetching, selectedDropdownOption } =
    useHomeContext()!;
  const contractAddress = collectionMetadata?.collections?.[0]?.primaryContract;

  const onSearch = (id: string) => {
    setIsFetching(true);
    setCollectionNfts({ tokens: [], continuation: null });

    const tokenString = `${contractAddress!}:${id}`;
    const attribute = generateAttributeString(selectedTraits);

    getCollectionNftsV2(
      chainId,
      selectedDropdownOption.value,
      selectedDropdownOption.order,
      undefined,
      undefined,
      attribute,
      tokenString
    )
      .then((result) => setCollectionNfts(result))
      .catch(() => setCollectionNfts({ tokens: [], continuation: null }))
      .finally(() => setIsFetching(false));

    if (!id) {
      getCollectionNftsV2(
        chainId,
        selectedDropdownOption.value,
        selectedDropdownOption.order,
        contractAddress,
        undefined,
        attribute
      ).then((result) => setCollectionNfts(result));
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
