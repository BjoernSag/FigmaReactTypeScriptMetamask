import React, {useState} from 'react';
import styled from 'styled-components';
import RightArrowVector from '../../icons/RightArrowVector.svg'
import Graph from '../helperComponents/Graph'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const Container = styled.div`
    width: 100%
    max-width:100vw;
    margin-bottom: 20px;

    h2 {
        margin: 10px 10px;
    }
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

const Top = styled.div`
    display:grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    align-items: center;
`

const UpperbodySubtitle = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;

    h4 {
        margin: 5px 1px;
    }

    p {
        margin: 5px 2px;
    }
`

const UpperbodyCard = styled.div`
    background: lightgrey;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-row-gap: 10px;
    h4 {
        margin: 10px 1px;
    }

    p {
        margin: 5px 2px;
    }
`
const BuySellButtons = styled.div`
`
const TradeButton = styled.button`
    background: #09BC8A;
    font-size: 1.2em;
    height: 40px;
    width: 80px;

`
const TimeButtons = styled.div`
    padding: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin: 4px 2px;
    text-align: center;
    text-decoration: none;
  
  border: none;

`
const TimeButton = styled.button`
font-size: 1.2em;
color:white;
border-radius: 50%;
background: #004346;
`
const Body = styled.div`
    margin: 0 10px;

`
const NewsCard = styled.div`
    background: lightgrey;
    border: 1px solid black;
`

/* Hardcoded data for graphs. for 1day, 1week, 1month, and 1year */
const g1DData = [{name: 'Unit A', uv: 400, pv: 2400, amt: 2400}, 
    {name: 'Unit B', uv: 500, pv: 3400, amt: 3400}];

const g1WData = [{name: 'Unit A', uv: 400, pv: 2400, amt: 2400}, 
{name: 'Unit B', uv: 500, pv: 3400, amt: 3400},
{name: 'Unit c', uv: 700, pv: 2000, amt: 2000}];

const g1MData = [{name: 'Page A', uv: 200, pv: 400, amt: 400}, 
{name: 'Unit B', uv: 300, pv: 600, amt: 600}, 
{name: 'Unit c', uv: 400, pv: 2000, amt: 2000},
{name: 'Unit d', uv: 500, pv: 400, amt: 400}];

const g1YData = [{name: 'Page A', uv: 400, pv: 2400, amt: 2400}, 
{name: 'Unit B', uv: 500, pv: 3400, amt: 3400},
{name: 'Unit B', uv: 500, pv: 3400, amt: 3400},
{name: 'Unit B', uv: 500, pv: 3400, amt: 3400},
{name: 'Unit B', uv: 500, pv: 3400, amt: 3400}];

/* Hardcoded text to inform */
const shortText = 'Text about uniswap. This is where you write information that might help a new or experienced user might..'
let longText =  'Text about uniswap. This is where you write information that might help a new or experienced user might'
longText += 'do things. This is a longer text for everyone to understand the topic a little easier. We can write longer too.'

function MarkedItem({data, myData, ...props}:{props:Object, data:Array<Object>, myData:Array<Object>}) {
    const [graphData, setGraphData] = useState(g1DData)
    const [showShortText, changeShowShortText] = useState(true)
    

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
           <h2>
           <StyledLink to="/marked">Market</StyledLink> &nbsp;
           {<img src={RightArrowVector} alt="RightArrowIcon" />}
           &nbsp;
        {abbreviation}
           </h2>
       </Breadcrumbs>
       <Upperbody>
           <Top>
       <h1>{currentThing.name}</h1> 
       <BuySellButtons>
           <TradeButton><StyledLink to={`/marked/${currentThing.abbreviation}/buyoption`}>
                Trade
                </StyledLink></TradeButton>
       </BuySellButtons>
       </Top>
       <UpperbodySubtitle>
           <div>
             <h4>Profit</h4>
             {currentThing.profit}
           </div>
           <div>
             <h4>My Average Strike Price</h4>
             <p>{currentThing.avgstrike}</p>
           </div>   
       </UpperbodySubtitle>
       <UpperbodyCard>
           <div><h4>Risk</h4><p>{currentThing.risk}</p></div>
           <div><h4>Price</h4><p>{currentThing.price}</p></div>
           <p></p>
           <div><h4>1D</h4><p>{currentThing.oneday}</p></div>
           <div><h4>1W</h4><p>{currentThing.oneweek}</p></div>
           <div><h4>1Y</h4><p>{currentThing.oneyear}</p></div>
       </UpperbodyCard>
       <TimeButtons>
           <TimeButton onClick={() => setGraphData(g1DData)}>1D</TimeButton>
           <TimeButton onClick={() => setGraphData(g1WData)}>1W</TimeButton>
           <TimeButton onClick={() => setGraphData(g1MData)}>1M</TimeButton>
           <TimeButton onClick={() => setGraphData(g1YData)}>1Y</TimeButton>
       </TimeButtons>
       <h3>Graph:</h3>
        <Graph data = {graphData}/>
       </Upperbody>
       <Body>
       <h3>Info</h3>
       {showShortText ? <p>{shortText}</p> : <p>{longText}</p>}
       {showShortText ? <p onClick={() => changeShowShortText(!showShortText)}>Show more</p> :
        <p onClick={() => changeShowShortText(!showShortText)}>Show Less</p>}
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
