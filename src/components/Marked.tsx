import React from 'react';
import styled from 'styled-components';
import BuyIcon from './BuyIcon.svg'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const Container = styled.div`
    width: 100%
    max-width:100vw;
`
const Topbar = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    `

    const AssetDiv = styled.div`

    `
    
    const AssetDivFirstLine = styled.div`
        padding: 0 2%;
        display: grid;
        background: lightgrey;
        grid-template-columns: 1fr 1fr 1.5fr 0.5fr;
    `

    const AssertDivLineMap = styled.div`
        background:white;
        margin:0;
        padding:0;
    `
    
    const AssetDivLine = styled.div`
        padding: 0 2%;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
    `

    const assets = [
        {name:'Uniswap', risk: '4', price:'$18.42', abbreviation:'UNI'},
        {name:'Ether', risk: '4', price:'$18.42', abbreviation:'ETH'},
        {name:'Ether', risk: '4', price:'$18.42', abbreviation:'ETH'},
        {name:'Ether', risk: '4', price:'$18.42', abbreviation:'ETH'}        
    ]

function Marked() {
    return <Container>
        <Topbar>
            <h2>
                Marked
            </h2>
            <p></p>
            <div>Div</div>
            <div>Div</div>
        </Topbar>
        <AssetDiv>
            <AssetDivFirstLine>
                <p>50 Assets</p>
                <p></p>
                <p>Alphabetical A-Z</p>
                <p></p>
            </AssetDivFirstLine>
            {assets.map((element, index:number) => {
                return <AssertDivLineMap key={index}>
                    <h4>{element.name}</h4>
                    <AssetDivLine key={index}>
                        <p>{element.abbreviation}</p>
                        <p>{element.price}</p>
                        <p>{element.risk}</p>
                        <StyledLink to={`/marked/${element.abbreviation}`}><img src={BuyIcon} alt="buyIcon" /></StyledLink>
                    </AssetDivLine></AssertDivLineMap>
                })}
       </AssetDiv>
        
    
    <p className="positiveMargin">+2.3%($200.21)</p>

   </Container>
}

export default Marked;
