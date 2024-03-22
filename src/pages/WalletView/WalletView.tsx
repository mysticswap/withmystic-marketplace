import { Link, useParams } from "react-router-dom";
import WalletNftCard, {
  NftCard,
} from "../../components/WalletNftCard/WalletNftCard";
import "./WalletView.css";
import { getWalletNfts } from "../../services/api/marketplace-rsv-api";
import { useEffect, useState } from "react";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import SolidButton from "../../components/SolidButton/SolidButton";
import { copyToClipboard, truncateAddress } from "../../utils";
import { IoIosArrowBack } from "react-icons/io";
import { IoCopyOutline } from "react-icons/io5";
import { RiNftLine } from "react-icons/ri";
import CustomTooltip from "../../components/CustomTooltip/CustomTooltip";
import CardSkeleton from "../../components/CardSkeleton/CardSkeleton";

const WalletView = () => {
  const { chainId } = useConnectionContext()!;

  const { walletAddress } = useParams();
  const [nftsData, setNftsData] = useState([] as NftCard[]);
  const [continuation, setContinuation] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const getNftsData = () => {
    setIsFetching(true);
    getWalletNfts(chainId, walletAddress!)
      .then((result) => {
        setNftsData(result?.tokens);
        if (continuation != null) {
          setContinuation(result?.continuation);
          setIsFetching(false);
        }
      })
      .catch(() => {
        // console.log(e);
        setIsFetching(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };

  useEffect(() => {
    getNftsData();
  }, [chainId]);

  const showMore = () => {
    setIsFetching(true);
    getWalletNfts(chainId, walletAddress!, continuation)
      .then((result) => {
        nftsData.push(...result.tokens);
        setIsFetching(false);
        if (continuation != null) {
          setContinuation(result?.continuation);
        } else {
          setContinuation("");
        }
      })
      .catch(() => {
        setIsFetching(false);
      })
      .finally(() => {
        setIsFetching(false);
      });
  };
  return (
    <div className="wallet_view_container">
      <div className="wallet_view_header">
        <Link to="/">
          <IoIosArrowBack size={25} />
        </Link>
        <CustomTooltip text={!copied ? "Tap to copy." : "Copied"}>
          <h3
            onClick={() => {
              copyToClipboard(walletAddress!);
              setCopied(true);
            }}
          >
            {truncateAddress(walletAddress!, 6, "...")}
            <IoCopyOutline />
          </h3>
        </CustomTooltip>
      </div>
      <div className="wallet_view_slider">
        <p>
          <RiNftLine size={25} />
          My Items
        </p>
      </div>

      {nftsData.length > 0 ? (
        <div className="wallet_view_card_holder">
          {nftsData?.map((nft, index) => (
            <WalletNftCard
              key={index}
              nft={nft}

              // isVerified={true}
            />
          ))}
        </div>
      ) : (
        !isFetching && <h1>No items found for this search</h1>
      )}
      {isFetching && (
        <div className="wallet_view_card_holder">
          <CardSkeleton cards={9} />
        </div>
      )}
      {nftsData.length > 0 && continuation != null && (
        <SolidButton
          text="Show more"
          className="show_more_Button"
          onClick={showMore}
        />
      )}
    </div>
  );
};
export default WalletView;
