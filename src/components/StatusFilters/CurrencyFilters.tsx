/* eslint-disable no-console */
import { useEffect, useState } from "react";
import "./StatusFilters.css";
import { RiArrowUpSLine } from "react-icons/ri";
import { useHomeContext } from "../../context/HomeContext/HomeContext";
import { getCollectionNftsV2 } from "../../services/api/marketplace-rsv-api";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import CurrencyListItem from "../StatusListItem/CurrencyListItem";

const CurrencyFilters = () => {
  const {
    setCollectionNfts,
    collectionChainId,
    collectionContract,
    supportedTokens,
  } = useGlobalContext();

  const { setIsFetching, selectedDropdownOption } = useHomeContext()!;
  const [showList, setShowlist] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const tempTokens = [...supportedTokens];
  const newTokens = tempTokens.splice(-1);
  const [currency, setCurrency] = useState<string | undefined>(
    isClicked ? newTokens[0].contract : undefined
  );

  const newCurrency = isClicked ? newTokens[0].contract : undefined;

  // const handleCurrency = async () => {
  //   setCollectionNfts({ tokens: [], continuation: null });
  //   setIsFetching(true);
  //   // getCollectionNftsV2(
  //   //   collectionChainId,
  //   //   "floorAskPrice",
  //   //   "asc",
  //   //   collectionContract,
  //   //   undefined,
  //   //   undefined,
  //   //   undefined,
  //   //   undefined,
  //   //   currency
  //   // ).then((result) => {
  //   //   setCollectionNfts(result);
  //   //   setIsClicked(!isClicked);
  //   //   setIsFetching(false);
  //   // });

  //   try {
  //     // const updatedCurrency = isClicked ? currency : undefined;

  //     const result = await getCollectionNftsV2(
  //       collectionChainId,
  //       selectedDropdownOption.value,
  //       selectedDropdownOption.order,
  //       collectionContract,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       undefined,
  //       currency
  //     );

  //     setCollectionNfts(result);
  //     // setIsClicked(!isClicked);
  //     setIsFetching(false);
  //   } catch (error) {
  //     // Handle errors here
  //     console.error("An error occurred:", error);
  //   }
  // };

  useEffect(() => {
    const handleCurrency = async () => {
      setCollectionNfts({ tokens: [], continuation: null });
      setIsFetching(true);

      const result = await getCollectionNftsV2(
        collectionChainId,
        selectedDropdownOption.value,
        selectedDropdownOption.order,
        collectionContract,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        newCurrency
      );

      setCollectionNfts(result);
      setIsFetching(false);
    };

    handleCurrency();
  }, [
    collectionChainId,
    collectionContract,
    currency,
    isClicked,
    newCurrency,
    selectedDropdownOption.order,
    selectedDropdownOption.value,
    setCollectionNfts,
    setIsFetching,
  ]);

  return (
    <div className="status_container">
      <button className="filter_trigger" onClick={() => setShowlist(!showList)}>
        Currency{" "}
        <RiArrowUpSLine
          className="status_down_arrow"
          aria-expanded={!showList}
          size={20}
        />
      </button>
      <ul className="status_list" aria-expanded={!showList}>
        {newTokens.map((token, i) => {
          return (
            <CurrencyListItem
              key={i}
              currency={currency}
              isClicked={isClicked}
              setIsClicked={setIsClicked}
              setCurrency={setCurrency}
              // handleClick={handleCurrency}
              token={token}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default CurrencyFilters;
