import { Link } from "react-router-dom";
import SolidButton from "../../components/SolidButton/SolidButton";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="error-page">
      <h1>404: Page not found</h1>
      <Link to="/">
        <SolidButton text="Return to home" />
      </Link>
    </div>
  );
};

export default ErrorPage;
