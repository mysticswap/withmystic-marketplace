import './CollectionsSection.css'
import { Collection } from "../../types";
import ethereumIcon from "./../../../../assets/ethereum-1.svg";
import checkIcon from "./../../../../assets/checkSign.png";

interface IProps {
  title:string,
  collections: Array<Collection>
}

export const CollectionsSection = ({title, collections}:IProps) => {
  
  return (
    <div className="colletions_section_container">
    <h1 className="collections_section_title">{title}</h1>
    <div className="collections_section_grid">
      {collections.map((collection)=>
            <div className="collection_card_container">
            <img className="collection_card_image" src="https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840"/>
            <div className="collection_card_footer">
            <div className='collection_name_container'>
              <img className="check_icon" src={checkIcon}/>
              <span className="collection_card_name">{collection.collection}</span>
            </div>
                <div className="card_footer_info">
                  <span className="card_footer_info_label">Floor</span>
                  <div className='price_container'>
                    <img className="ethereum_icon" src={ethereumIcon}/>
                    <span className="card_footer_info_value">{collection.floor}</span>
                   </div>
                </div>
            </div>
          </div>
      )}

    </div>
  </div>
  )
}
