import "./Banner.css";
import { useGlobalContext } from "../../context/GlobalContext";
import millify from "millify";
import { useHomeContext } from "../../context/HomeContext";

type Props = { bannerImage: string };

const Banner = ({ bannerImage }: Props) => {
  const { collectionMetadata } = useGlobalContext()!;
  const { currentTab, setCurrentTab, tabOptions } = useHomeContext()!;
  const pillData = [
    { title: "Items", value: collectionMetadata?.totalSupply },
    { title: "Owners", value: 3300 },
    { title: "Total vol.", value: 1900 },
    { title: "Floor price", value: 19 },
  ];
  return (
    <div className="banner">
      <img src={bannerImage} alt="" />
      <div className="banner_details">
        <h1>{collectionMetadata?.name}</h1>
        <div className="collection_pill">
          {pillData.map((item) => {
            return (
              <div className="pill_item" key={item.title}>
                <p>{millify(Number(item.value))}</p>
                <p>{item.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div className="tabs">
        {tabOptions.map((item) => {
          return (
            <button
              key={item}
              className={item == currentTab ? "active_tab" : ""}
              onClick={() => {
                setCurrentTab(item);
              }}
            >
              {item}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Banner;
