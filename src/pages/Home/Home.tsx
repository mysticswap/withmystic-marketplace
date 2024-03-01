import Banner from "../../components/Banner/Banner";
import { CollectionsTable } from "../../components/CollectionsTable/CollectionsTable";
import Tab from "./Components/Tab/Tab";
import { useEffect, useState } from "react";
import './Home.css'
import { collectionTableOptions } from "../../constants";
import { CollectionsSection } from "../../components/CollectionSection/CollectionsSection";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { ICollection } from "../Collections/types";

const CollectionsPage = () => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<null | number>(0)
  const {
    availableCollections
  } = useGlobalContext();
  const [tableRows, setTableRows ] = useState<Array<ICollection>>([]);
  
  useEffect(()=>{
    handleDefaultCollections()
  },[])

  function handleTrendingCollections(){
    const parsedData = availableCollections.map((collection, index)=>({
      id:collection.id,
      number:index, 
      address:collection.address,
      collection:collection.name, 
      floor: "1 ETH",
      oneDVolume: "100 ETH", 
      owners:"9ETH", 
      volume:"2,678", 
      supply: "4,4444",
    }))
    
   setTableRows(parsedData);
  }
  function handleDefaultCollections(){
    const parsedData = availableCollections.map((collection, index)=>({
      id:collection.id,
      number:index, 
      address:collection.address,
      collection:collection.name, 
      floor: "1 ETH",
      oneDVolume: "100 ETH", 
      owners:"9ETH", 
      volume:"2,1078", 
      supply: "5,84887",
    }))
    
   setTableRows(parsedData);
   
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
      <CollectionsSection title="Categories" collections={tableRows}/>
      <CollectionsSection title="Brands" collections={tableRows}/>

    </div>
    
  )
};

export default CollectionsPage;
