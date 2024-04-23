import { useState, useEffect } from 'react'
import abi from "./contractJson/komatips.json"
import { ethers } from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import './App.css'
import { Avatar } from '@web3uikit/core'

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null
  })
  const [account, setAccount] = useState('Not connected');
  useEffect(() => {
    const template = async () => {

      const contractAddress = "0xCDb23CF7B56328F304D61cb91F2a8df076c30839";
      const contractABI = abi.abi;
      //Metamask part
      //1. In order do transactions on goerli testnet
      //2. Metmask consists of infura api which actually help in connectig to the blockhain
      try {

        const { ethereum } = window;
        const account = await ethereum.request({
          method: "eth_requestAccounts"
        })

        window.ethereum.on("accountsChanged", () => {
          window.location.reload()
        })
        setAccount(account);
        const provider = new ethers.providers.Web3Provider(ethereum);//read the Blockchain
        const signer = provider.getSigner(); //write the blockchain

        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          signer
        )
        console.log(contract)
        setState({ provider, signer, contract });

      } catch (error) {
        console.log(error)
      }
    }
    template();
  }, [])
  return (
    <div>

      <div className='account_card'>
        <Avatar
          isRounded
          size={60}
          theme="image"
        />
        <div>Connected Account:
          <div>{account}</div>
        </div>
      </div>

      {console.log('state', state)}

      <Buy state={state} />
      <Memos state={state} />

    </div>
  )
}

export default App
