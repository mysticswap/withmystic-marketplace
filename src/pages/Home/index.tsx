import { useEffect, useState } from "react";
import "./index.css";
import {
  getCollection,
  getCollectionNfts,
} from "../../services/marketplace-api";
import Navbar from "../../components/Navbar/Navbar";
import { GlobalContextProvider } from "../../context/GlobalContext";
import Banner from "../../components/Banner/Banner";
import { CollectionMetaData, SingleNftData } from "../../types/alchemy.types";
import ControlBar from "../../components/ControlBar/ControlBar";
import ItemsScreen from "../../components/ItemsScreen/ItemsScreen";

const Home = () => {
  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZGQwYzkzZDUxZmY2YTQzNDUzMmIwZCIsImlhdCI6MTY5MjIwODI3NX0.JE8H-CxF6tb64njGmrIUc_L_YTM1Gt99YR2WoRw0Nn0";
  const [collectionMetadata, setCollectionMetadata] =
    useState<CollectionMetaData | null>(null);
  const [collectionNfts, setCollectionNfts] = useState<SingleNftData[]>([]);

  useEffect(() => {
    getCollection("0x74cb5611e89078b2e5cb638a873cf7bddc588659", 1, apiKey).then(
      (result) => {
        setCollectionMetadata(result);
      }
    );

    getCollectionNfts(
      "0x74cb5611e89078b2e5cb638a873cf7bddc588659",
      1,
      1,
      apiKey
    ).then((result) => {
      setCollectionNfts(result.nfts);
    });
  }, []);
  return (
    <GlobalContextProvider
      collectionMetadataState={{ collectionMetadata, setCollectionMetadata }}
      collectionNftsState={{ collectionNfts, setCollectionNfts }}
    >
      <div>
        <Navbar
          logo={"https://mysticswap.io/static/media/mystWizGuild2.824b89cd.png"}
        />
        <Banner
          bannerImage={
            "https://i.seadn.io/gcs/files/6d4b873bd01107ff35489dbe69e031d1.png?auto=format&dpr=1&w=3840"
          }
        />
        <ControlBar />
        <ItemsScreen />
      </div>
    </GlobalContextProvider>
  );
};

export default Home;
