
import React, {useState} from 'react';

function EtheriumInfo() {
    const [currentAccount, setCurrentaccount] = useState("")

    /* Easiest getaround to type error to connect to metamask */
    const ethereum = (window as any).ethereum

    //Check if we are connected to MetaMask
    if (typeof ethereum !== 'undefined') {
        
      }

      const onClickConnect = async () => {
        try {
          // Will open the MetaMask UI
          // You should disable this button while the request is pending!
          await ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error(error);
        }
      };

      const getAccounts = async () => {
          const accounts = await ethereum.request({ method : 'eth_accounts'})
          setCurrentaccount(accounts[0])
      }


    return <div>
      <h4>Connect to metamask or see current connected account</h4>
        <button onClick={() => onClickConnect()}>Connect your wallet</button>
        <button onClick={() => getAccounts()}>Check current account</button>
        <p><strong>Current account is:</strong> {currentAccount}</p>

    </div>
  
}

export default EtheriumInfo;
