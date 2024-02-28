import React from "react";
import ReactDOM from "react-dom/client";
import { Web3OnboardProvider } from "@web3-onboard/react";
import App from "./App.tsx";
import "./index.css";
import web3Onboard from "./services/web3Onboard.ts";
import ScopedCssBaseline from '@mui/material/ScopedCssBaseline';

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Web3OnboardProvider web3Onboard={web3Onboard}>
    <ScopedCssBaseline>
      <App />
    </ScopedCssBaseline>
    </Web3OnboardProvider>
  </React.StrictMode>
);
