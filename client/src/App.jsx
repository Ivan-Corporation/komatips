import { useState, useEffect } from 'react'
import abi from "./contractJson/komatips.json"
import { ethers } from "ethers"
import Memos from './components/Memos'
import Buy from './components/Buy'
import './App.css'
import React from 'react'
import { Avatar, Button, Hero, Typography } from '@web3uikit/core'
import { ConnectButton } from '@web3uikit/web3'
import hero_cat from './assets/cat_hero.png'

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


      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px', marginBottom: '50px' }}>
        <Hero
          align="right"
          backgroundColor="#0F7FFF"
          customImage={{
            url: hero_cat
          }}
          height="200px"
          padding="20px"
          rounded="20px"
          style={{ width: '900px' }}
        >

          <React.Fragment key=".0">
            <div className='account_card'>
              <Avatar
                isRounded
                size={60}
                theme="image"
              />
              <Typography
                color="#FFFFFF"
                variant="h5"
              >
                <div>Connected Account:
                  <div>{account[0]?.substring(0, 16) + '....' + account[0]?.substring(account[0]?.length - 4)}</div>
                </div>
              </Typography>
            </div>
            <Button
              customize={{
                backgroundColor: 'transparent',
                border: '1px solid white',
                color: '#FFFFFF'
              }}
              onClick={() => window.open(`https://blockscan.com/address/${account[0]}?t=tx`, '_blank')}
              iconLayout="trailing"
              isTransparent
              text="Book a demo"
              theme="custom"
            />
          </React.Fragment>

        </Hero></div>

      <Buy state={state} />
      <Memos state={state} />

    </div>
  )
}

export default App
