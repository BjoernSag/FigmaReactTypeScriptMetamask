import React from 'react';
import styled from 'styled-components';
import RightArrowVector from './RightArrowVector.svg'
import Graph from './Graph'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const Container = styled.div`
    width: 100%
    max-width:100vw;
    margin-bottom: 20px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    `
const Breadcrumbs = styled.span`
`

const Upperbody = styled.div`
    margin: 0 auto;
    text-align: center;
`

const UpperbodySubtitle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
`

const UpperbodyCard = styled.div`
    background: lightgrey;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
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
const TimeButtons = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;

`
const TimeButton = styled.button`
    background: lightgrey;
`
const Body = styled.div`

`
const NewsCard = styled.div`
    background: lightgrey;
    border: 1px solid black;
`


function MarkedItem({data, myData, ...props}:{props:Object, data:Array<Object>, myData:Array<Object>}) {
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
    


    console.log('props name', currentThing)
    return <Container>
        <Breadcrumbs>
           <h1>
           <StyledLink to="/marked">Marked</StyledLink> &nbsp;
           {<img src={RightArrowVector} alt="RightArrowIcon" />}
           &nbsp;
        {abbreviation}
           </h1>
       </Breadcrumbs>
       <Upperbody>
       <h1>{currentThing.name}</h1>
       <UpperbodySubtitle>
           <div>
             <h4>Profit</h4>
             {currentThing.profit}
           </div>
           <div>
             <h4>My Average Strike Price</h4>
             {currentThing.avgstrike}
           </div>   
       </UpperbodySubtitle>
       <UpperbodyCard>
           <div><h5>Risk</h5><p>{currentThing.risk}</p></div>
           <div><h5>Price</h5><p>{currentThing.price}</p></div>
           <p></p>
           <div><h5>1D</h5><p>{currentThing.oneday}</p></div>
           <div><h5>1W</h5><p>{currentThing.oneweek}</p></div>
           <div><h5>1Y</h5><p>{currentThing.oneyear}</p></div>
       </UpperbodyCard>
       <BuySellButtons>
           <BuyButton>
                Add to Cart
           </BuyButton>
           <SellButton>
                Sell
           </SellButton>
       </BuySellButtons>
       <TimeButtons>
           <TimeButton>1D</TimeButton>
           <TimeButton>1W</TimeButton>
           <TimeButton>1M</TimeButton>
           <TimeButton>1Y</TimeButton>
       </TimeButtons>
       <h3>Graph:</h3>
        <Graph/>
       </Upperbody>
       <Body>
       <h3>Info</h3>
       <p>Text about uniswap. This is where you write information that might help a new or experienced
           user might.. 
       </p>
       <p>Read more</p>
       <h3>News</h3>
       <NewsCard>
           <h5>Congress pledges support</h5>
           <strong>New York Time</strong>
        </NewsCard>
        <NewsCard>
           <h5>The options for the future</h5>
           <strong>Washington Post</strong>
        </NewsCard>

       </Body>
       
      </Container>
}

export default MarkedItem;
