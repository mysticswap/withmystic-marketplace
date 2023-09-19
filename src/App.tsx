import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalContextProvider } from "./context/GlobalContext";
import Home from "./pages/Home";
import { HomeContextProvider } from "./context/HomeContext";

function App() {
  return (
    <>
      <GlobalContextProvider>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <HomeContextProvider>
                  <Home />
                </HomeContextProvider>
              }
            />
          </Routes>
        </Router>
      </GlobalContextProvider>
    </>
  );
}

export default App;
