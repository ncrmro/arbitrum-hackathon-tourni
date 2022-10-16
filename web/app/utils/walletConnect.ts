import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';


export const useWalletConnect = () => new WalletConnectProvider({
    infuraId: 'INFURA_ID',
    rpc: "https://goerli.infura.io/v3/3ce173e356c6440f9a497933bfa90046",
    chainId: "5"
});
