import { useState } from "react";
import "./StatusFilters.css";
import { RiArrowUpSLine } from "react-icons/ri";
import StatusListItem from "../StatusListItem/StatusListItem";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import { getCollectionNftsV2 } from "../../services/api/marketplace-reservoir-api";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { collectionContract } from "../../config";
import { generateAttributeString, getHostName } from "../../utils";

const StatusFilters = () => {
  const { setCollectionNfts, collectionChainId } = useGlobalContext()!;
  const {
    numericFilters,
    setNumericFilters,
    selectedDropdownOption,
    selectedTraits,
    setIsFetching,
  } = useHomeContext()!;
  const [showList, setShowlist] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleBuyOrListingFilter = (isBuyFilter: boolean) => {
    const source = getHostName();
    const { minFloorAskPrice } = numericFilters;
    const updatedFilters = {
      ...numericFilters,
      minFloorAskPrice: minFloorAskPrice.length < 1 ? "0" : "",
    };
    const attributeString = generateAttributeString(selectedTraits);
    setNumericFilters(updatedFilters);
    setCollectionNfts({ tokens: [], continuation: null });
    setIsFetching(true);
    getCollectionNftsV2(
      collectionChainId!,
      selectedDropdownOption.value,
      selectedDropdownOption.order,
      collectionContract,
      undefined,
      attributeString,
      undefined,
      updatedFilters,
      isBuyFilter ? undefined : !isClicked ? source : undefined
    ).then((result) => {
      setCollectionNfts(result);
      setIsClicked(!isClicked);
      setIsFetching(false);
    });
  };

  return (
    <div className="status_container">
      <button className="filter_trigger" onClick={() => setShowlist(!showList)}>
        Status{" "}
        <RiArrowUpSLine
          className="status_down_arrow"
          aria-expanded={!showList}
          size={20}
        />
      </button>
      <ul className="status_list" aria-expanded={!showList}>
        <StatusListItem
          text="Buy now only"
          handleClick={() => handleBuyOrListingFilter(true)}
        />
        <StatusListItem
          text="Local listings only"
          handleClick={() => handleBuyOrListingFilter(false)}
        />
      </ul>
    </div>
  );
};

export default StatusFilters;
