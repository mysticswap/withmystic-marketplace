import "./AutoPlayer.css";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { crateVideoCache, getVideoCache } from "../../utils/videoCache-utils";

type props = { videoUrl: string; posterUrl: string; nftUrl: string };

function AutoPlayer({ videoUrl, posterUrl, nftUrl }: props) {
  // Lazy loading of videos
  const autoVidRef = useRef<HTMLVideoElement>(null);
  const [cacheUrl, setCacheUrl] = useState("");

  const { ref, inView } = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    getVideoCache(videoUrl).then((res) => {
      if (res) setCacheUrl(res);
    });
  }, []);

  // console.log(cacheUrl);
  useEffect(() => {
    const lazyLoadVideos = () => {
      if (inView == true) {
        autoVidRef.current?.play();
        crateVideoCache(videoUrl);
      } else {
        autoVidRef.current?.pause();
      }
    };
    lazyLoadVideos();
  }, [inView]);
  return (
    <div ref={ref} className="nft_auto_player">
      <Link to={nftUrl}>
        <video
          ref={autoVidRef}
          poster={posterUrl}
          // autoPlay
          loop
          muted
          controlsList="nodownload"
          preload="none"
        >
          <source src={cacheUrl != "" ? cacheUrl : videoUrl} type="video/mp4" />
        </video>
      </Link>
    </div>
  );
}
export default AutoPlayer;
