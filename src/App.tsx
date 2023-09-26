import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext/GlobalContext";
import Home from "./pages/Home";
import { HomeContextProvider } from "./context/HomeContext/HomeContext";
import NftPage from "./pages/NftPage/NftPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={<HomeContextProvider children={<Home />} />}
            />
            <Route path="/nft/:id" element={<NftPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </Router>
      </GlobalContextProvider>
    </>
  );
}

export default App;
