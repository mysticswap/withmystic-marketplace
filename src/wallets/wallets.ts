import coinbaseWalletModule from "@web3-onboard/coinbase";
import bloctoModule from "@web3-onboard/blocto";
import enrkypt from "@web3-onboard/enkrypt";
import frameModule from "@web3-onboard/frame";
import frontierModule from "@web3-onboard/frontier";
import safeModule from "@web3-onboard/gnosis";
import infinityWalletWalletModule from "@web3-onboard/infinity-wallet";
import ledgerModule from "@web3-onboard/ledger";
import mewWallet from "@web3-onboard/mew-wallet";
import phantomModule from "@web3-onboard/phantom";
import tahoWalletModule from "@web3-onboard/taho";
import walletConnectModule from "@web3-onboard/walletconnect";
import xdefiWalletModule from "@web3-onboard/xdefi";
import zealWalletModule from "@web3-onboard/zeal";
import { INFURA_ID, WALLET_CONNECT_PROJECT_ID } from "../config/index";

const coinbaseWalletSdk = coinbaseWalletModule({ darkMode: true });
const blocto = bloctoModule();
const enrkyptModule = enrkypt();
const frame = frameModule();
const frontier = frontierModule();
const safe = safeModule();
const infinityWalletSDK = infinityWalletWalletModule();
const mewWalletModule = mewWallet();
const phantom = phantomModule();
const taho = tahoWalletModule();
const wcV2InitOptions = {
  projectId: INFURA_ID,
  requiredChains: [1, 5, 137, 81457, 42170, 42161, 11155111],
  dappUrl: "https://mysticswap.io/",
};
const walletConnect = walletConnectModule(wcV2InitOptions);
const xdefiWalletSdk = xdefiWalletModule();
const zealWalletSdk = zealWalletModule();
const ledger = ledgerModule({
  walletConnectVersion: 2,
  projectId: WALLET_CONNECT_PROJECT_ID,
  requiredChains: [1, 5, 137, 81457, 42170, 42161, 11155111],
});

export const installedWallets = [
  coinbaseWalletSdk,
  walletConnect,
  ledger,
  blocto,
  enrkyptModule,
  frame,
  frontier,
  safe,
  infinityWalletSDK,
  mewWalletModule,
  phantom,
  taho,
  xdefiWalletSdk,
  zealWalletSdk,
];
