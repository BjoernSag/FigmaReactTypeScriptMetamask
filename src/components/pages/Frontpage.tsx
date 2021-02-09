import React from 'react';
import styled from 'styled-components';
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
    text-align: center;
    `

const AssetDiv = styled.div`

`

const AssetDivFirstLine = styled.div`
    padding: 0 2%;
    display: grid;
    background: white;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`

const AssetDivLine = styled.div`
    padding: 0 2%;
    display: grid;
    background: lightgrey;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
  align-items: center;
`

const assets = [
    {name:'Uniswap', value:'10,454.20', return:'24%', abbreviation:'UNI'},
    {name:'Uniswap', value:'10,454.20', return:'10%', abbreviation: 'UNI'},
    {name:'Uniswap', value:'10,454.20', return:'10%', abbreviation: 'UNI'},
    {name:'Uniswap', value:'10,454.20', return:'10%', abbreviation: 'UNI'}        
]

function Frontpage() {
    return <Container>
       <h2>
           $20,928.91
       </h2>
       <p className="positiveMargin">+2.3%($200.21)</p>
       <AssetDiv>
        <AssetDivFirstLine>
            <p>Assets</p>
            <p>Daily Value</p>
            <p>Return</p>
            <p></p>
        </AssetDivFirstLine>
        {assets.map((element, index:number) => {
            return <AssetDivLine key={index}>
                    <p>{element.name}</p>
                    <p>{element.value}</p>
                    <p>{element.return}</p>
                    <StyledLink to={`/marked/${element.abbreviation}`}>{'Read more'}</StyledLink>
                </AssetDivLine>
               })}
           
        
       </AssetDiv>
      </Container>
}

export default Frontpage;
