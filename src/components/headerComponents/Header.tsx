import React from 'react';
import styled from 'styled-components';
import logo from './MenuVector.svg';
import Menu from 'react-burger-menu/lib/menus/slide';
import Navbar from './Navbar'


/* Using styled components to fully make these items modular
Don't have to delete any function specific css, just have to exhange
imports if we want to quickly change  */
const HeaderDiv = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 0%;
    background: #74B3CE;
    height: 50px;

    
/* Position and sizing of burger button */
.bm-burger-button {
  position: absolute;
  width: 36px;
  height: 30px;
  left: 20px;
  top: 1%;
}

/* Color/shape of burger icon bars */
.bm-burger-bars {
  background: #508991;
}

/* Color/shape of burger icon bars on hover*/
.bm-burger-bars-hover {
  background: #a90000;
}

/* Position and sizing of clickable cross button */
.bm-cross-button {
  height: 24px;
  width: 24px;
}

/* Color/shape of close button cross */
.bm-cross {
  background: #fff5f2;
}

/*
Sidebar wrapper styles
Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
*/
.bm-menu-wrap {
  position: fixed;
  height: 100%;
}

/* General sidebar styles */
.bm-menu {
  font-family: 'Sanches', serif;
  background: #74B3CE;
  font-size: 1.15em;
}

/* Morph shape necessary with bubble or elastic */
.bm-morph-shape {
  fill: #74B3CE;
}

/* Wrapper for item list */
.bm-item-list {
  color: #74B3CE;
}

/* Individual item */
.bm-item {
  display: inline-block;
}

/* Styling of overlay */
.bm-overlay {
  background: rgba(0, 0, 0, 0.3);
}
`


const RightItem = styled.div`
  color:white;
  display: flex;
  justify-content: center;
  align-items: center;
  
`

const RightItemText = styled.div`
text-align: center;
`

const FeedbackElement = styled.button`
position : fixed;
font-size: 1em;
top:50%;
right: -30px;
transform: rotate(-90deg);
border: none;
color:white;
background: #09BC8A;
z-index: 20000;
`

const HeaderDivDesktop = styled.div`
display: flex;
    justify-content: space-between;
    margin: 0%;
  background:#74B3CE;
`

/* Return the header. Use a imported menu component
Use the navbar as child of that */
function Header({isMobile} : {isMobile:boolean}) {
  return isMobile ? <div>
     <HeaderDiv>
        <Menu width= {'50%'}>
            <Navbar isMobile={isMobile}/>
        </Menu>
        <RightItem><RightItemText>location.eth</RightItemText></RightItem>
      </HeaderDiv>
      <FeedbackElement>Feedback</FeedbackElement>
    </div> : <div>
      <HeaderDivDesktop>
        <Navbar isMobile={isMobile}/>
        <RightItem><div>location.eth</div></RightItem>
      </HeaderDivDesktop>
      <FeedbackElement>Feedback</FeedbackElement>
    </div>
}

export default Header;
