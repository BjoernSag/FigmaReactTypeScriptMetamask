import React from 'react';
import styled from 'styled-components';
import BuyIcon from '../../icons/BuyIcon.svg'
import FilterIcon from '../../icons/FilterIcon.svg'
import SearchIcon from '../../icons/SearchIcon.svg'
import {
  BrowserRouter as Router,
  Route, Link
} from 'react-router-dom'

const Container = styled.div`
    width: 100%
    max-width:100vw;

    h2 {
        margin: 10px 10px;
    }
`
const Topbar = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
  align-items: center;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    `

    const AssetDiv = styled.div`
    h4 {
        margin: 10px 10px;
    }
    p {
        margin: 10px 10px;
    }

    `
    
    const AssetDivFirstLine = styled.div`
        padding: 0 2%;
        display: grid;
        background: lightgrey;
        grid-template-columns: 1fr 1fr;
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
        {name:'Uniswap', risk: '4', price:'$18.42', abbreviation:'UNI'},
        {name:'Uniswap', risk: '4', price:'$18.42', abbreviation:'UNI'},
        {name:'Uniswap', risk: '4', price:'$18.42', abbreviation:'UNI'}        
    ]

function Marked() {
    return <Container>
        <Topbar>
            <h2>
                Market
            </h2>
            <p></p>
            <img src={SearchIcon} alt="searchIcon" />
            <img src={FilterIcon} alt="filterIcon" />
        </Topbar>
        <AssetDiv>
            <AssetDivFirstLine>
                <p>50 Assets</p>
                <p>Alphabetical A-Z</p>
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
   </Container>
}

export default Marked;
