import React from 'react';
import styled from 'styled-components';
import moonIcon from '../../icons/MoonIcon.svg';
import {
    BrowserRouter as Router,
    Route, Link
  } from 'react-router-dom'



/* Using styled components to fully make these items modular
Don't have to delete any function specific css, just have to exhange
imports if we want to quickly change  */
const ContainerDivMobile = styled.div`
    padding: 20%;
    font-size: 26px;
`
const ContainerDiv = styled.div`
    display:grid;    
    grid-template-columns: 1fr 1fr 1fr;
    font-size: 26px;
`

const StyledLink = styled(Link)`
    text-decoration: none;
    color: white;
    &:hover {
        color:red;
    }
    `
/* A function to render the navbar. Use the react router to navigate in the app
use styled components to add some style and css to it 

The moonIcon is for a future night mode feature and doesn't have any functionality now*/
function Navbar({isMobile} : {isMobile:boolean}) {
  return isMobile ? 
    <ContainerDivMobile>
        <div className="menu-item"><StyledLink to='/'>Home</StyledLink></div>
        <div className="menu-item"><StyledLink to='/marked'>Market</StyledLink></div>
        <img onClick={() => alert('NightMode has not been implemented yet')} src={moonIcon} alt="moonIcon"/>
    </ContainerDivMobile> : <ContainerDiv>
        <div className="menu-item"><StyledLink to='/'>Home</StyledLink></div>
        <div className="menu-item"><StyledLink to='/marked'>Market</StyledLink></div>
        <div> &nbsp; <img onClick={() => alert('NightMode has not been implemented yet')}src={moonIcon} alt="moonIcon"/></div>
    </ContainerDiv>
}

export default Navbar;
