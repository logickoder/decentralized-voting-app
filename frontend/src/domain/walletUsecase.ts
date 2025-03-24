import { ethers } from 'ethers';
import useAppStore from './store.ts';
import VotingAbi from '../../../dapp/out/Voting.sol/Voting.json';

interface WalletUsecase {
  connect: () => Promise<ethers.Signer | null>;
  disconnect: () => void;
  getContract: (useSigner?: boolean) => Promise<ethers.Contract | null>;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

let provider: ethers.BrowserProvider | null = null;
let signer: ethers.Signer | null = null;

const walletUsecase: WalletUsecase = {
  connect: async () => {
    if (!window.ethereum) throw new Error('Please install MetaMask');
    provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send('eth_requestAccounts', []); // Request account access
    signer = await provider.getSigner();
    useAppStore.getState().connectWallet((signer as ethers.JsonRpcSigner).address);
    return signer;
  },
  disconnect: () => {
    // Disconnect the wallet
    useAppStore.getState().clear();
    provider = null;
    signer = null;
  },
  getContract: async (useSigner: boolean) => {
    let signerOrProvider = useSigner ? signer : provider;
    if (!signerOrProvider) {
      // check if the user is connected
      const wallet = useAppStore.getState().wallet;
      if (wallet) {
        await walletUsecase.connect();
      }

      signerOrProvider = useSigner ? signer : provider;
      // If the user is still not connected, return null
      if (!signerOrProvider) {
        return null;
      }
    }
    return new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS, VotingAbi.abi, signerOrProvider);
  }
};

window.ethereum?.on('accountsChanged', (accounts: string[]) => {
  if (accounts.length === 0) {
    walletUsecase.disconnect();
  } else {
    void walletUsecase.connect();
  }
});

export default walletUsecase;