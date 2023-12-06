import "./Loading.css";
import { BiLoaderCircle } from "react-icons/bi";

const Loading = () => {
  return (
    <div className="loading_screen">
      <BiLoaderCircle className="loader" size={50} />
    </div>
  );
};

export default Loading;
