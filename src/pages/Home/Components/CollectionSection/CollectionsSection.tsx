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
            <img className="collection_card_image" src="https://s3-alpha-sig.figma.com/img/3cab/5061/594142703370d867de77470166ece1a0?Expires=1708905600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=ZqXxwuQyWpbd9MdyT4UyqAqkZ2R~qq~Fhyv1PXNQD-qegTW3guaD0AmzKpUL9sCQGDmybFPHGOm9R6-dz7oXAyWxwAZacZIptLutLg~1Gf-8~AeeIxFvV7udg0imZ3SAG7F9VNEJYK0WtSVgI4wS1-hyM80ocMv9txR8t0NnHeJ4l~4xUgYnrm-rqK5s8EWqjkgNSHx5KR~oYaf4Iubw7omwUeBiALvzd7VFSNGFb6IN0QNAEUXLVk8HhyYcGL-8Y7pi~h907qH394WLZvjeY1GVmU~8vPFkPeScudew4CPsTzU0Y9~uRyQBxAGu0yJx7E1ZprhFf2Ebs~pofzxHhQ__"/>
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
