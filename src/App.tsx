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
import { TransactionContextProvider } from "./context/TransactionContext/TransactionContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { getMarketplaceClient } from "./services/api/dynamic-system";
import { ClientObject } from "./types/dynamic-system.types";
import Loading from "./components/Loading/Loading";
import { changeStyles } from "./utils/dynamic-styles";
import { updateFavicon, updateSiteTitle } from "./utils";

function App() {
  const [isFetchingClient, setIsFetchingClient] = useState(true);
  const [client, setClient] = useState({} as ClientObject);

  useEffect(() => {
    getMarketplaceClient()
      .then((result) => {
        setClient(result);
        setIsFetchingClient(false);
      })
      .catch(() => {
        setIsFetchingClient(true);
      });
  }, []);

  useEffect(() => {
    changeStyles(client);
    updateFavicon(client.favicon);
    updateSiteTitle(client.htmlTitle);
  }, [client]);

  return (
    <>
      {isFetchingClient && <Loading />}
      {!isFetchingClient && (
        <ConnectionContextProvider>
          <GlobalContextProvider client={client}>
            <TransactionContextProvider>
              <Router>
                <Navbar />
                <Routes>
                  <Route
                    path="/"
                    element={<HomeContextProvider children={<Home />} />}
                  />
                  <Route
                    path="/:contract/:id"
                    element={<NftPageContextProvider children={<NftPage />} />}
                  />
                  <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
                <ToastContainer limit={1} />
              </Router>
            </TransactionContextProvider>
          </GlobalContextProvider>
        </ConnectionContextProvider>
      )}
    </>
  );
}

export default App;
