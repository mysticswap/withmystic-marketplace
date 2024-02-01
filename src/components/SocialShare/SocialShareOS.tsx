import { IoClose, IoCopyOutline } from "react-icons/io5";
import { useNftPageContext } from "../../context/NftPageContext/NftPageContext";
import "./SocialShare.css";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { useLocation } from "react-router-dom";
import { convertToIPFSImage, copyToClipboard, getHostName } from "../../utils";
import { useIsCopied } from "../../hooks/useIsCopied";
import CustomTooltip from "../CustomTooltip/CustomTooltip";

const SocialShareOS = () => {
  const { nftDataOS, setShowShareModal } = useNftPageContext()!;
  const { copiedMessage, setIsCopied, isCopied } = useIsCopied();
  const shareMessage = `Wow, check out ${nftDataOS.title}`;
  const host = getHostName();
  const location = useLocation();
  const pageLink = `https://${host}${location.pathname}`;
  const image = convertToIPFSImage(nftDataOS?.rawMetadata.image);

  return (
    <div className="modal_parent">
      <div className="modal_content social_modal_content">
        <div className="social_modal_nft">
          <img src={image} alt="" />
          <div className="ellipsis">
            <p className="ellipsis">
              {nftDataOS.contract.openSea.collectionName}
            </p>
            <p className="ellipsis">{nftDataOS.title}</p>
          </div>
        </div>
        <IoClose
          className="modal_closer"
          display="block"
          size={25}
          onClick={() => setShowShareModal(false)}
        />
        <div className="social_modal_main">
          <TwitterShareButton
            title={shareMessage}
            url={pageLink}
            children={<TwitterIcon round size={50} />}
          />
          <FacebookShareButton
            quote={shareMessage}
            url={pageLink}
            children={<FacebookIcon round size={50} />}
          />
          <TelegramShareButton
            title={shareMessage}
            url={pageLink}
            children={<TelegramIcon round size={50} />}
          />
          <EmailShareButton
            subject={shareMessage}
            body={shareMessage}
            url={pageLink}
            children={<EmailIcon round size={50} />}
          />
        </div>
        <div className="social_modal_link">
          <p>{pageLink}</p>
          <CustomTooltip text={copiedMessage}>
            <div>
              <IoCopyOutline
                onClick={() => {
                  copyToClipboard(pageLink);
                  setIsCopied(!isCopied);
                }}
              />
            </div>
          </CustomTooltip>
        </div>
      </div>
    </div>
  );
};

export default SocialShareOS;
