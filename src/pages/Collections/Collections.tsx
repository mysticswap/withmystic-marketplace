import Banner from "../../components/Banner/Banner";
import { CollectionsTable } from "./Components/CollectionsTable/CollectionsTable";
import Tab from "./Components/Tab/Tab";
import { useEffect, useState } from "react";
import './Collections.css'
import { Collection } from "./types";
import { CollectionsSection } from "./Components/CollectionSection/CollectionsSection";

const CollectionsPage = () => {
  const [rows, setRows ] = useState<Array<Collection>>([]);
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
  
  function handleDefaultCollections(){
    setRows([
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
      <CollectionsTable rows={rows}/>
      <CollectionsSection title="Categories" collections={rows}/>
      <CollectionsSection title="Brands" collections={rows}/>

    </div>
    
  )
};

export default CollectionsPage;
