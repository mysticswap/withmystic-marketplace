import { useParams } from "react-router-dom";
import WalletNftCard from "../../components/WalletNftCard/WalletNftCard";
import "./WalletView.css";
import { getWalletNfts } from "../../services/api/marketplace-rsv-api";
import { useEffect, useState } from "react";
import { TokenToken } from "../../types/rsv-types/collection-nfts.types";

const WalletView = () => {
  const { walletAddress } = useParams();
  const [nftsData, setNftsData] = useState([] as TokenToken[]);

  useEffect(() => {
    const getNftsData = async () => {
      const walletUserNfts = await getWalletNfts(1, walletAddress!);
      console.log(walletUserNfts);
      setNftsData(walletUserNfts?.tokens);
    };
    getNftsData();
  }, []);

  return (
    <div className="wallet_view_container">
      {nftsData?.map((nft, index) => (
        <WalletNftCard key={index} nft={nft} />
      ))}
    </div>
  );
};
export default WalletView;
