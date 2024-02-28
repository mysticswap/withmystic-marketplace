import Banner from "../../components/Banner/Banner";
import { CollectionsTable } from "../../components/CollectionsTable/CollectionsTable";
import Tab from "./Components/Tab/Tab";
import { useEffect, useState } from "react";
import './Home.css'
import { collectionTableOptions } from "../../constants";
import { Collection } from "./types";
import { CollectionsSection } from "../../components/CollectionSection/CollectionsSection";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { TokenElement } from "../../types/rsv-types/collection-nfts.types";

const CollectionsPage = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<null | number>(0)
  const {
    collectionNfts,

  } = useGlobalContext();
  const [tableRows, setTableRows ] = useState<Array<Collection>>([]);
  const [tokens, setTokens ] = useState<Array<TokenElement>>(collectionNfts.tokens);
  function createData(
    number:string,
    collection: string,
    floor: string,
    volume: string,
    oneDVolume: string,
    owners: string,
    supply: string,
  ) {
    return { number, collection, floor, oneDVolume, owners, volume, supply };
  }
  
  useEffect(()=>{
    handleDefaultCollections()
  },[])
  useEffect(() => {
    setTokens(collectionNfts?.tokens);
  }, [collectionNfts]);
  function handleTrendingCollections(){
    setTableRows([
      createData("1",'Trending Mystical Wizards', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("2",'Pudgy penguins', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("3",'Red Apples', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("4",'Oranges', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("5",'Mythical Beings', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
    ]);
  }
  function handleDefaultCollections(){
    setTableRows([
      createData("1",'Mystical Wizards', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("2",'Pudgy penguins', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("3",'Red Apples', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("4",'Oranges', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("5",'Mythical Beings', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
    ]);
  }
    
  function handleTabSelection(index:number) {
    setSelectedTabIndex(index)
    
    switch(index) 
    {
      case 0:
        return handleDefaultCollections()
      case 1:
        return handleTrendingCollections()
    }
  }
  
  return (
    <div className="collections_page_container">
      <Banner  activity={false} />
      <div className="tabs_container">
        {collectionTableOptions.map((number, index) => <Tab  key={index}isSelected={selectedTabIndex === index}
         name={String(number)}
         select={() =>handleTabSelection(index)}/>)}
      </div>
      <CollectionsTable rows={tableRows}/>
      <CollectionsSection title="Categories" collections={tokens}/>
      <CollectionsSection title="Brands" collections={tokens}/>

    </div>
    
  )
};

export default CollectionsPage;
