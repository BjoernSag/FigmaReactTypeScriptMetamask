import React, {useState} from 'react';
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
    `

    /* This pool is using the same protocol as uniswap. So the pool will always be 50/50. If someone buys from one side of the pool, the
    individual value on that side goes up. So that the total value remains the same */
const pool = [
    {name:'ACoin', currentValue: 20000, amount:10000, individualValue: 2},
    {name: 'BCoin', currentValue: 20000, amount: 100, individualValue: 200}
]
/* Fund the coin that the buyer wants to buy and decrease the number of that coin. Then find the new individual value by looing at
currentValue/amount and then updating the indiidual value so that the value of the 2 coins remain equal */
const buyCoint = (amount:number, name:string) => {
    let currentCoin = {}
    for(let i = 0; i<pool.length; i++) {
        for (const [k, v] of Object.entries(pool[i])) {
            if(name === v) {
                currentCoin = pool[i]
            }
          }
    }



} 




function AMM({buyAmount, sellAmount} : {buyAmount:number, sellAmount:number}) {
   

    return <Container>
       
   </Container>
}

export default AMM;
