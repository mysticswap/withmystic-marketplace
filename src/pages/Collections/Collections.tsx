import Banner from "../../components/Banner/Banner";
import { CollectionsTable } from "../../components/CollectionsTable/CollectionsTable";
import Tab from "./Components/Tab/Tab";
import { useEffect, useState } from "react";
import './Collections.css'
import { ICollection } from "./types";
import { CollectionsSection } from "../../components/CollectionSection/CollectionsSection";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";

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
      <Banner activity={false} />
      <div className="tabs_container">
        <Tab />
      </div>
      <CollectionsTable rows={tableRows}/>
      <CollectionsSection title="Categories" collections={tableRows}/>
      <CollectionsSection title="Brands" collections={tableRows}/>

    </div>
    
  )
};

export default CollectionsPage;
