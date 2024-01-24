import { useRef, useState } from "react";
import "./VideoPlayer.css";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
// import { useInView } from "react-intersection-observer";
type props = { videoUrl: string; posterUrl: string; nftUrl: string };

export const VideoPlayer = ({ videoUrl, posterUrl, nftUrl }: props) => {
  const [isplaying, setIsplaying] = useState(false);
  // const [diamondHost, setDiamondHost] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  function playVideo() {
    if (isplaying == false) {
      vidRef?.current?.play();
      setIsplaying(!isplaying);
    } else {
      vidRef?.current?.pause();
      setIsplaying(!isplaying);
    }
  }
  // Lazy loading of videos
  // const { ref, inView } = useInView({
  //   /* Optional options */
  //   threshold: 0,
  // });
  // const lazyLoadVideos = () => {
  //   if (inView == true) {
  //     vidRef.current?.toggleAttribute("autoplay", true);
  //     buttonRef.current?.classList.toggle("hide", true);
  //     vidRef.current?.load();
  //   }
  // };

  // const listenLoadedData = () => {
  //   vidRef.current?.addEventListener(
  //     "loadeddata",
  //     function () {
  //       if (this.duration <= 15) {
  //         vidRef.current?.toggleAttribute("autoplay", true);
  //         buttonRef.current?.classList.toggle("hide", true);
  //       }
  //     },
  //     true
  //   );
  // };

  // useEffect(() => {
  //   // lazyLoadVideos();
  //   // listenLoadedData();
  // }, [vidRef]);

  return (
    <div className="nft_video_player">
      <Link to={nftUrl}>
        <video
          ref={vidRef}
          poster={posterUrl}
          controls={isplaying}
          loop
          controlsList="nodownload"
          preload="auto"
        >
          <source src={videoUrl} type="video/mp4" />
        </video>
      </Link>
      <button
        ref={buttonRef}
        className="play_buttom"
        onClick={() => {
          playVideo();
        }}
      >
        <IconContext.Provider value={{ size: "2em", className: "react-icons" }}>
          {isplaying ? <CiPause1 /> : <CiPlay1 />}
        </IconContext.Provider>
      </button>
    </div>
  );
};
