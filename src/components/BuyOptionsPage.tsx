import React, {useState} from 'react';
import styled from 'styled-components';
import RightArrowVector from './RightArrowVector.svg'
import Spreadsheet from './Spreadsheet'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

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

const Lowerbody = styled.div`
    margin: 0 auto;
    max-width: 90vw;

`
const LowerbodyHorizontalButtons = styled.div`
    display:flex;
    

`
const LowerbodyHorizontalButton = styled.button`

`

const LowerbodyVerticalButtons = styled.div`
    transform: rotate(90deg);
    display:flex;
`
const LowerbodyVerticalButton = styled.button`
    width: 50px;


`

function BuyOptionsPage({data, isMobile, myData, ...props}:{props:Object, isMobile:boolean, data:Array<Object>, myData:Array<Object>}) {
    const [scrollToValue, setScrollToValue] = useState(0)
    
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
    let currentData:any = {}
    for(let i = 0; i<data.length; i++) {
        for (const [k, v] of Object.entries(data[i])) {
            if(abbreviation === v) {
                currentThing = myData[i]
            }
            name += v  // Type is any
          }
    }

    for (const [k, v] of Object.entries(data[0])) {
        subValues.push(k)
        name += v  // Type is any
      }

    return <Container>
        <Breadcrumbs>
           <h1>
           <StyledLink to="/marked">Marked</StyledLink> &nbsp;
           {<img src={RightArrowVector} alt="RightArrowIcon" />}
           &nbsp;
           <StyledLink to={`/marked/${abbreviation}`}>{abbreviation}</StyledLink> &nbsp;
           {<img src={RightArrowVector} alt="RightArrowIcon" />}
           &nbsp;
           Buy option
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
       </Upperbody>
       <Lowerbody>
            <LowerbodyHorizontalButtons>
                <div>
                    Series
                    <LowerbodyHorizontalButton>
                        $WETH/USDC
                    </LowerbodyHorizontalButton>
                </div>
                <div>
                    Expiry
                    <LowerbodyHorizontalButton>
                    Sat, 27 Feb 2021
                    </LowerbodyHorizontalButton>
                </div>
            </LowerbodyHorizontalButtons>
            <LowerbodyVerticalButtons>
                <LowerbodyVerticalButton>Calls</LowerbodyVerticalButton>
                <LowerbodyVerticalButton>Puts</LowerbodyVerticalButton>
            </LowerbodyVerticalButtons>
            <Spreadsheet isMobile={isMobile} list={data} scrollToValue={scrollToValue}
            scrollTo={(e:number) => setScrollToValue(e)} uniqueValues={subValues}/>
       </Lowerbody>
   </Container>
}

export default BuyOptionsPage;
