import { useRef, useState } from "react";
import "./VideoPlayer.css";
import { CiPause1, CiPlay1 } from "react-icons/ci";
import { IconContext } from "react-icons";
type props = { videoUrl: string; posterUrl: string };

export const VideoPlayer = ({ videoUrl, posterUrl }: props) => {
  const [isplaying, setIsplaying] = useState(false);
  const vidRef = useRef<HTMLVideoElement>(null);

  function playVideo() {
    if (isplaying == false) {
      vidRef?.current?.play();
      setIsplaying(!isplaying);
    } else {
      vidRef?.current?.pause();
      setIsplaying(!isplaying);
    }
  }
  return (
    <div className="nft_video_player">
      <video
        ref={vidRef}
        poster={posterUrl}
        controls={isplaying}
        playsInline
        loop
        controlsList="nodownload"
        preload="metadata"
      >
        <source src={videoUrl} type="video/mp4" />
      </video>
      <button
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
