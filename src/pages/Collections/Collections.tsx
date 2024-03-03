import Banner from "../../components/Banner/Banner";
import { CollectionsTable } from "../../components/CollectionsTable/CollectionsTable";
import Tab from "./Components/Tab/Tab";
import { useEffect, useState } from "react";
import './Collections.css'
import { ICollection } from "./types";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { PeriodSelector } from "./Components/PeriodSelector/PeriodSelector";

const CollectionsPage = () => {
  const {
    availableCollections,
  } = useGlobalContext();

  const [tableRows, setTableRows ] = useState<Array<ICollection>>([]);

  useEffect(()=>{
    handleDefaultCollections()
  },[])
  
  function handleDefaultCollections(){
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
    
  return (
    <div className="collections_page_container">
      <Banner activity={false} displayCollectionAvatar={false} />
      <div className="collections_tabs_container">
        <Tab />
        <PeriodSelector/>
      </div>
      <CollectionsTable rows={tableRows}/>
    </div>
    
  )
};

export default CollectionsPage;
