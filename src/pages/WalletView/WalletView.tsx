import { useParams } from "react-router-dom";
import WalletNftCard, {
  NftCard,
} from "../../components/WalletNftCard/WalletNftCard";
import "./WalletView.css";
import { getWalletNfts } from "../../services/api/marketplace-rsv-api";
import { useEffect, useState } from "react";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import SolidButton from "../../components/SolidButton/SolidButton";

const WalletView = () => {
  const { chainId } = useConnectionContext()!;
  const { walletAddress } = useParams();
  const [nftsData, setNftsData] = useState([] as NftCard[]);
  const [continuation, setContinuation] = useState("");

  useEffect(() => {
    const getNftsData = async () => {
      const walletUserNfts = await getWalletNfts(chainId, walletAddress!);
      setNftsData(walletUserNfts?.tokens);
      if (continuation != null) {
        setContinuation(walletUserNfts?.continuation);
      }
    };
    getNftsData();
  }, [chainId]);

  const showMore = async () => {
    const walletUserNfts = await getWalletNfts(
      chainId,
      walletAddress!,
      continuation
    );

    nftsData.push(...walletUserNfts.tokens);
    if (continuation != null) {
      setContinuation(walletUserNfts?.continuation);
    } else {
      setContinuation("");
    }
  };
  return (
    <div className="wallet_view_container">
      <div className="wallet_view_card_holder">
        {nftsData?.map((nft, index) => (
          <WalletNftCard key={index} nft={nft} />
        ))}
      </div>
      <SolidButton
        text="Show more"
        className="show_more_Button"
        onClick={showMore}
        disabled={continuation == null}
      />
    </div>
  );
};
export default WalletView;
