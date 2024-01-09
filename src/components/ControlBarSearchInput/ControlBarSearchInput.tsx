import { IoClose, IoSearchSharp } from "react-icons/io5";
import "./ControlBarSearchInput.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { getCollectionNftsV2 } from "../../services/api/marketplace-rsv-api";
import { generateAttributeString } from "../../utils";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import { useEffect, useState } from "react";

const ControlBarSearchInput = () => {
  const { setCollectionNfts, collectionMetadata, collectionChainId } =
    useGlobalContext();
  const { selectedTraits, setIsFetching, selectedDropdownOption } =
    useHomeContext()!;
  const [inputText, setInputText] = useState<string>("");
  const contractAddress = collectionMetadata?.collections?.[0]?.primaryContract;

  const clearInput = () => {
    setInputText("");
    setIsFetching(true);
    const attribute = generateAttributeString(selectedTraits);
    getCollectionNftsV2(
      collectionChainId,
      selectedDropdownOption.value,
      selectedDropdownOption.order,
      contractAddress,
      undefined,
      attribute
    )
      .then((result) => setCollectionNfts(result))
      .finally(() => setIsFetching(false));
  };

  const onSearch = (id: string) => {
    setIsFetching(true);

    setCollectionNfts({ tokens: [], continuation: null });
    const tokenString = `${contractAddress!}:${id}`;
    const attribute = generateAttributeString(selectedTraits);

    getCollectionNftsV2(
      collectionChainId,
      selectedDropdownOption.value,
      selectedDropdownOption.order,
      undefined,
      undefined,
      attribute,
      tokenString
    )
      .then((result) => {
        setCollectionNfts(result);
      })
      .catch(() => setCollectionNfts({ tokens: [], continuation: null }))
      .finally(() => setIsFetching(false));

    if (!id) {
      getCollectionNftsV2(
        collectionChainId,
        selectedDropdownOption.value,
        selectedDropdownOption.order,
        contractAddress,
        undefined,
        attribute
      ).then((result) => setCollectionNfts(result));
    }
  };

  useEffect(() => {
    const getSearchNft = setTimeout(() => {
      if (inputText != "") {
        onSearch(inputText);
      } else {
        const attribute = generateAttributeString(selectedTraits);

        getCollectionNftsV2(
          collectionChainId,
          selectedDropdownOption.value,
          selectedDropdownOption.order,
          contractAddress,
          undefined,
          attribute
        ).then((result) => setCollectionNfts(result));
      }
    }, 700);

    return () => clearTimeout(getSearchNft);
  }, [inputText]);

  return (
    <div className="control_bar_search">
      <input
        type="number"
        placeholder="Search by Token ID"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value);
        }}
      />
      {!inputText ? (
        <IoSearchSharp size={20} />
      ) : (
        <IoClose size={20} className="input_closer" onClick={clearInput} />
      )}
    </div>
  );
};

export default ControlBarSearchInput;
