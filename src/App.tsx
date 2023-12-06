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
import SwapsPage from "./pages/SwapsPage/SwapsPage";

function App() {
  return (
    <>
      <ConnectionContextProvider>
        <GlobalContextProvider>
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
                <Route path="/swaps" element={<SwapsPage />} />
                <Route path="*" element={<ErrorPage />} />
              </Routes>
              <Footer />
              <ToastContainer limit={1} />
            </Router>
          </TransactionContextProvider>
        </GlobalContextProvider>
      </ConnectionContextProvider>
    </>
  );
}

export default App;
