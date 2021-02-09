import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import RightArrowVector from './RightArrowVector.svg'
import EtheriumInfo from './EtheriumInfo'
import Spreadsheet from './Spreadsheet'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'
import Web3 from 'web3'

const Container = styled.div`
    width: 100%
    max-width:100vw;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    `
const Breadcrumbs = styled.span`
`

const Lowerbody = styled.div`
    margin: 0 auto;
    text-align: center;
`

const LowerbodySubtitle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const Upperbody = styled.div`

`
const UpperbodySubtitle = styled.div`

`

const BuySellButtons = styled.div`
    display: grid;
    height: 68px;
    width: 115px;
    grid-template-columns: 1fr 1fr;
`
const BuyButton = styled.button`
    background: green;

`
const SellButton = styled.button`
    background:red;
`
const Searchform = styled.form`
align-content: center;
text-align:center;
width: 100%; 
`

const Searchinput = styled.input`
  font-size: 1em;
`
const SearchContainer = styled.div`
  padding: 4% 0;
`

const Content = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const LowerbodyCard = styled.div`
    background: lightgrey;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
`



function BuyOptionsPage({data, isMobile, myData, ...props}:{props:Object, isMobile:boolean, data:Array<Object>, myData:Array<Object>}) {
    const [account, setAccount] = useState('')
    const [currentStatusIsBuy, setCurrentStatus] = useState(true)
    const [value, setValue] = useState(0)

    useEffect(() => {
        loadBlockchainData()
        }, [])

    const loadBlockchainData = async() => {
        const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545')  
        const network = await web3.eth.net.getNetworkType()
        const accounts = await web3.eth.getAccounts()
        setAccount(accounts[0])
        console.log('network', accounts)  

    }

      //Update searched content live as the user is searching
  const handleChange = (event: { target: { value: React.SetStateAction<number>; }; }) => {
    //Check the length of the input and if it is over 75 characters send an alert
    setValue(event.target.value)
  }

    //Send an alert to the user on submit
    const handleSubmit = (event: { preventDefault: () => void; }) => {
        alert('Amount you want to ' + (currentStatusIsBuy? 'buy ' : 'sell ') + 'is ' + value)
        event.preventDefault()
      }
    
    let subValues = []
    /* We run through the props to make the array of chars into a single string */
    let abbreviation = ''
        for (const [k, v] of Object.entries(props)) {
            abbreviation += v  // Type is any
        }

    /*Find the current token name*/
    let name = ''
    /* Set the type to any so we can use .name, .abr and such */
    let currentThing:any = {}
    for(let i = 0; i<data.length; i++) {
        for (const [k, v] of Object.entries(data[i])) {
            if(abbreviation === v) {
                currentThing = myData[i]
            }
            name += v  // Type is any
          }
    }


    return <Container>
        <EtheriumInfo />
        <Breadcrumbs>
           <h1>
           <StyledLink to="/marked">Marked</StyledLink> &nbsp;
           {<img src={RightArrowVector} alt="RightArrowIcon" />}
           &nbsp;
           <StyledLink to={`/marked/${abbreviation}`}>{abbreviation}</StyledLink> &nbsp;
           {<img src={RightArrowVector} alt="RightArrowIcon" />}
           &nbsp;
           Buy
           </h1>
       </Breadcrumbs>
       <Upperbody>
        <h1>$WETH/USDC</h1>
       <UpperbodySubtitle>
           <h4>$400 Strike Price</h4>
       </UpperbodySubtitle>
       <BuySellButtons>
           <BuyButton onClick={() => setCurrentStatus(true)}>
                Buy
                </BuyButton>
           <SellButton onClick={() => setCurrentStatus(false)}>
                Sell
           </SellButton>
       </BuySellButtons>
       <SearchContainer>
            <Searchform id="searchform" onSubmit={(e: { preventDefault: () => void; }) => handleSubmit(e)}>
              <Searchinput type="text" value={value} placeholder="0" onChange={(e:any) => handleChange(e)} />
              <h1>My wallet</h1>
              <Content>
                  <p>UDSC</p><p>0.000 UDSC</p>
                  <p>UDSC</p><p>0.000 UDSC</p>
                  <p>UDSC</p><p>0.000 UDSC</p>
              </Content>
              <h1>Trade details</h1>
              <Content>
                  <p>UDSC</p><p>0.000 UDSC</p>
                  <p>UDSC</p><p>0.000 UDSC</p>
                  <p>UDSC</p><p>0.000 UDSC</p>
              </Content>
                <hr />
                <Content>
                <h3>Total cost </h3>
                <h3>0.000 USDC </h3>
                </Content>
                
              <Searchinput type="submit" value="Submit" />
            </Searchform>
          </SearchContainer>

       </Upperbody>
       <Lowerbody>
       <h1>{currentThing.name}</h1>
       <LowerbodySubtitle>
           <div>
             <h4>Profit</h4>
             {currentThing.profit}
           </div>
           <div>
             <h4>My Average Strike Price</h4>
             {currentThing.avgstrike}
           </div>   
       </LowerbodySubtitle>
       <LowerbodyCard>
           <div><h5>Risk</h5><p>{currentThing.risk}</p></div>
           <div><h5>Price</h5><p>{currentThing.price}</p></div>
           <p></p>
           <div><h5>1D</h5><p>{currentThing.oneday}</p></div>
           <div><h5>1W</h5><p>{currentThing.oneweek}</p></div>
           <div><h5>1Y</h5><p>{currentThing.oneyear}</p></div>
       </LowerbodyCard>
       </Lowerbody>
   </Container>
}

export default BuyOptionsPage;