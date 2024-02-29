import Banner from "../../components/Banner/Banner";
import { CollectionsTable } from "../../components/CollectionsTable/CollectionsTable";
import Tab from "./Components/Tab/Tab";
import { useEffect, useState } from "react";
import './Collections.css'
import { Collection } from "./types";
import { CollectionsSection } from "../../components/CollectionSection/CollectionsSection";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { TokenElement } from "../../types/rsv-types/collection-nfts.types";

const CollectionsPage = () => {
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
  
  function handleDefaultCollections(){
    setTableRows([
      createData("1",'Mystical Wizards', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("2",'Pudgy penguins', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("3",'Red Apples', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("4",'Oranges', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
      createData("5",'Mythical Beings', "1 ETH", "100 ETH","9ETH", "2,678", "4,4444"),
    ]);
  }
    

  
  return (
    <div className="collections_page_container">
      <Banner activity={false} />
      <div className="tabs_container">
        <Tab />
      </div>
      <CollectionsTable rows={tableRows}/>
      <CollectionsSection title="Categories" collections={tokens}/>
      <CollectionsSection title="Brands" collections={tokens}/>

    </div>
    
  )
};

export default CollectionsPage;
