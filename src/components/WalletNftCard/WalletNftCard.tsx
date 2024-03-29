import { useEffect, useState } from "react";
import { useConnectionContext } from "../../context/ConnectionContext/ConnectionContext";
import { useGlobalContext } from "../../context/GlobalContext/GlobalContext";
import { TokenToken } from "../../types/rsv-types/collection-nfts.types";
import { redirectToNftPage } from "../../utils";
import { VideoPlayer } from "../VideoPlayer/VideoPlayer";
import "./WalletNftCard.css";
import { MdVerified } from "react-icons/md";

type props = {
  nft: NftCard;
  // isVerified: boolean;
};
export type NftCard = {
  token: TokenToken;
  ownerShip: object;
};
const WalletNftCard = ({ nft }: props) => {
  const { chainId } = useConnectionContext()!;
  const { availableCollections } = useGlobalContext()!;
  // console.log(nft);
  const nativeAmount = nft?.token?.floorAsk?.price?.amount?.native;
  const currentValue = nft?.token?.floorAsk?.price?.amount?.usd?.toFixed();
  const currentValueSymbol = nft?.token?.floorAsk?.price?.currency?.symbol;

  const lastSale = nft?.token?.lastSale?.price?.amount?.native;
  const lastSaleSymbol = nft?.token?.lastSale?.price?.currency?.symbol;

  const contract = nft?.token?.contract;
  const nftId = nft?.token?.tokenId;

  const [isLocal, setIsLocal] = useState(true);

  useEffect(() => {
    const localCollections: string[] = [];
    availableCollections?.forEach(({ address }) => {
      localCollections.push(address);
    });
    const isVerified = localCollections?.includes(contract);
    if (isVerified) {
      setIsLocal(true);
    } else {
      setIsLocal(false);
    }
  }, [availableCollections, contract]);

  return (
    <div
      onClick={() => redirectToNftPage(contract, nftId, isLocal, chainId)}
      className="wallet_nftCard_container"
    >
      {nft?.token?.media != null && nft?.token?.image === null ? (
        <div className="video_container">
          <VideoPlayer videoUrl={nft?.token?.media} />
        </div>
      ) : (
        <img src={nft?.token?.image} alt="nft" title={nft?.token?.name} />
      )}
      <div className="wallet_nftCard_details">
        <p>
          {nft?.token?.name}
          {"  "}
          {isLocal && <MdVerified color="#1E93FF" />}
        </p>
        {nativeAmount && (
          <p className="nft_card_amount">
            {nativeAmount} {currentValueSymbol}
            <span>(${currentValue})</span>
          </p>
        )}
        {lastSale && (
          <p className="nft_card_last_sale">
            Last sale: {lastSale} {lastSaleSymbol}
          </p>
        )}
      </div>
    </div>
  );
};
export default WalletNftCard;
