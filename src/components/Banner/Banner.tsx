import "./Banner.css";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import millify from "millify";
type Props = { bannerImage: string };

const Banner = ({ bannerImage }: Props) => {
  const {
    collectionMetadata,
    totalOwners,
    currentTab,
    setCurrentTab,
    tabOptions,
  } = useGlobalContext()!;
  const pillData = [
    { title: "Items", value: collectionMetadata?.totalSupply },
    { title: "Owners", value: totalOwners },
    { title: "Total vol.", value: 1900 },
    { title: "Floor price", value: collectionMetadata?.openSea?.floorPrice },
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
                <p>
                  {Number(item.value) < 1
                    ? Number(item.value)
                    : millify(Number(item.value))}
                </p>
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
