import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext/GlobalContext";
import Home from "./pages/Home";
import { HomeContextProvider } from "./context/HomeContext/HomeContext";
import NftPage from "./pages/NftPage/NftPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import { NftPageContextProvider } from "./context/NftPageContext/NftPageContext";
import { ConnectionContextProvider } from "./context/ConnectionContext/ConnectionContext";

function App() {
  return (
    <>
      <ConnectionContextProvider>
        <GlobalContextProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={<HomeContextProvider children={<Home />} />}
              />
              <Route
                path="/nft/:id"
                element={<NftPageContextProvider children={<NftPage />} />}
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </Router>
        </GlobalContextProvider>
      </ConnectionContextProvider>
    </>
  );
}

export default App;
