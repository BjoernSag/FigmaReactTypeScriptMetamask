import React, { useState, useEffect} from 'react'
import {useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import _ from 'lodash'
import { Column, Table, AutoSizer, SortDirection, SortDirectionType} from 'react-virtualized'
import './reactVirtualisedStyles.css'
import Swipe from 'react-easy-swipe';
import styled from 'styled-components'
import LeftArrowVector from '../../icons/LeftArrowVector.svg'
import RightArrowVector from '../../icons/RightArrowThickerVector.svg'
import MobileOnIcon from '../../icons/clarity_mobile-phone-solid.svg'
import MobileOffIcon from '../../icons/DesktopIcon.svg'
import {
    BrowserRouter as Router,
    Route, Link
  } from 'react-router-dom'


const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };
  
  
  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    `
  
  const StyledContainer = styled.div`
    width:100%;
    max-width: 90vw;
    text-align:center;
    margin: 0 auto;

    
  `
  
  const StyledViewImg = styled.img`
    padding:0px;
    right: 16px;
    top: 20px;
  `
  
  const StyledNavigationButtonRight = styled.img`
    position:absolute;
    right:0px;
    bottom:-200px;
    z-index:1000;
  `
  const StyledNavigationButtonLeft = styled.img`
    position:absolute;
    left:0px;
    bottom:-200px;
    z-index:1000;
  `

  const LowerbodyHorizontalButtons = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1.5fr 0.5fr;
`
const LowerbodyHorizontalButton = styled.div`

`

const LowerbodyHorizontalButtonsDesktop = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
`

  
  const  TableView = ({isMobile, scrollToValue, list, listPuts, scrollTo, uniqueValues} : 
    {isMobile:boolean, list:any, listPuts:any, scrollToValue:number, scrollTo: any, uniqueValues:any}) => {
    const [sortBy, setSortBy] = useState('strike')
    const [sortDirection, setSortDirection] = useState('ASC')
    const [sortedList, setSortedList] = useState(list)
    const [sortedListPuts, setSortedListPuts] = useState(listPuts)
    const [activeColumn, setActiveColumn] = useState('abbreviation')
    const [prevColumn, setPrevColumn] = useState(0)
    const [mobileView, setMobileView] = useState(isMobile)
    const [allColumns, setAllColumns] = useState(uniqueValues)
    const history = useHistory();
    const [callsOrPuts, setCallsOrPuts] = useState('calls')

  /* The style for the puts and calls buttons. Also includes the select to change columns */
    const LowestButtons = styled.div`
  display:flex;
  
`
const LowestButtonCalls = styled.button`
    width: 80px;
    background: #09BC8A;
    opacity: ${callsOrPuts === 'calls' ? '1' : '0.4'};
    border: 0.5px solid black;
`
const LowestButtonPuts = styled.button`
    width: 80px;
    background: #09BC8A;
    opacity: ${callsOrPuts === 'puts' ? '1' : '0.4'};
    border: 0.5px solid black;
`
  
    const StyledTable = styled.div`
    display:relative;
    padding-top: ${isMobile ? '0' : '0'};
    
  `
  
    const headerStyle = {
      textAlign: 'center',
      fontSize: '0.8rem',
      textTransform: 'uppercase',
      letterSpacing: '1px',
      padding: '30px 0',
    }
  
    const tableStyle={
      borderRadius: '10px',
      fontSize: '0.8rem',
      fontWeight: 'normal',
      border: 'none',
      borderCollapse: 'collapse',
      width: '100%',
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      textAlign: 'center',
    }
  
  
      /* The first sort. Sorts for name*/
    useEffect(() => {
      if(list.find((i:any) => i['strike'] === true)){
        const tempList = _.sortBy(list, item => item['strike'])
        const sortedLists = tempList.reverse()
        setSortedList(sortedLists)
        setActiveColumn('strike')
      }else {
        const tempList = _.sortBy(list, item => item[sortBy])
        const sortedLists = tempList.reverse()
        setSortedList(sortedLists)
      }

      if(listPuts.find((i:any) => i['strike'] === true)){
        const tempListPuts = _.sortBy(listPuts, item => item['strike'])
        const sortedLists = tempListPuts.reverse()
        setSortedListPuts(sortedLists)
      }else {
        const tempListPuts = _.sortBy(listPuts, item => item[sortBy])
        const sortedLists = tempListPuts.reverse()
        setSortedListPuts(sortedLists)
      }
      
    }, [list, listPuts, sortBy])

  
    /* A function that changes the style for the rendered rows, so that every other column
    is white and every other is another colour */
    const rowStyle = (e:any) => {
      return {height: '50px',background: e.index%2===0 ? '#C3DFEA' : '#fff5f2', }
    }
  
    //Variables that changes during scrolling 
    let prevScroll:number = 0
    /* Detect when the user is scrolling */
    const userScrolls = (scrollFromTop: number) => {
      if(scrollFromTop === 0) {
        return null
      }
      if(scrollFromTop === scrollToValue) {
        return null
      }
      prevScroll = scrollFromTop
      if(!prevScroll) {
          prevScroll = 0
      }
  
      var timer = null;
      if(timer !== null){
        clearTimeout(timer)
      }
      timer = setTimeout(function() {
        setPrevColumn(prevScroll)
      }, 275)
      
    }
  
    /* Let the user swipe to change the active column */
    const swipeColumn = (input:any) => {
      let index = 0;
      for(let i = 0; i<allColumns.length; i++){
        if(allColumns[i] === activeColumn){
          index = i;
        }
      }
  
      if(input==='right') {
        if(index===allColumns.length-1) index=-1;
        setActiveColumn(allColumns[index+1])
        scrollTo(prevScroll)
       
      }
      if(input==='left') {
        if(index===0) index=allColumns.length;
        setActiveColumn(allColumns[index-1])
        scrollTo(prevScroll)
      }
  
    }
  
    /* Gets the variable e from the method in the table, and extracts the sortBy variable
    this is to allow us to sort on all the different variables. We can set variables to not sortable by editing the 
    values in "column"
    We update the different states as to the current values */
    const sort = (e: { sortBy: any; sortDirection:any; }) => {
      setSortBy(e.sortBy)
      const tempList = _.sortBy(list, item => item[e.sortBy])
      const sortedList = sortDirection===SortDirection.DESC ? tempList.reverse() : tempList
      setSortedList(sortedList)
      if(sortDirection === 'DESC') {
        setSortDirection('ASC')
      } else {
        setSortDirection('DESC')
      }
    } 
    
    /* function to be used to allow for individual styling of the different elements of the table */
    const cellRendererEffect = ({key, rowIndex, style} : {key:number, rowIndex:number,
    style:Object}) => {
      if(sortedList[rowIndex]['effect'] > 100)
        style={color:'red'}
      return (
        <div key={key} style={style}>
          {sortedList[rowIndex]['effect']}
        </div>
      )
    }
  
    /* Get the selected option from the select box and set the active column to that 
    option through updating state, therby updating the component and the site, so that it
    happens live */
    const selectedColumn = (e:any) => {
      let element:any = document.getElementById('selectBox')
        let activeElement = element.options[element.selectedIndex]
      setActiveColumn(activeElement.value)
    }
  
    const cellRenderer = ({rowIndex} : {rowIndex:number}) => {
        <div>
            <StyledLink to="/">
                {rowIndex}
            </StyledLink>
        </div>
    }
  
    
    const tableProps = {
        className:"classes.table"
}
    // Render your table
    return(
      <StyledContainer>
        {/*Checks if it is mobile phone*/}
        {isMobile ?  
          /*Checks if it is mobile view(swipe) or the standard view (desktop)*/
          mobileView ? 
            <div>
              {/* Add the right and left arrow to change columns in mobile view */}
              <StyledNavigationButtonRight onClick={() => 
                swipeColumn('right')} width="30px" height="30px" src={RightArrowVector}/>
              <StyledNavigationButtonLeft onClick={() => swipeColumn('left')} width="30px" height="30px" src={LeftArrowVector}/>
              <LowerbodyHorizontalButtons>
                <div>
                  {/* Add the 2 select buttons and the button to change between mobile and desktop view on mobiles */}
                  <LowerbodyHorizontalButton>
                    Series
                    <select id='selectBoxLeftButton'>
                     <option value={'$WETH/USDC'}>$WETH/USDC</option>
                     </select>

                    </LowerbodyHorizontalButton>
                </div>
                <div>
                <LowerbodyHorizontalButton>
                Expiry
                    <select id='selectBoxLeftButton'>
                     <option value={'Sat, 27 Feb 2021'}>Sat, 27 Feb 2021</option>
                     </select>

                    </LowerbodyHorizontalButton>
                </div>
                <StyledViewImg color="white" height="60px" width="70px" src={MobileOnIcon} onClick={() => setMobileView(!mobileView)}/>
            </LowerbodyHorizontalButtons>
            {/* Add the lowest buttons and select. The select changes columns, the two buttons changes between puts and calls */}
            <LowestButtons>
            <select id='selectBox' onChange={(e) => selectedColumn(e)}>
                {uniqueValues.map((element:string, index:number) => <option value={element}>{element}</option>
                )}
              </select>
                <LowestButtonCalls onClick={() => setCallsOrPuts('calls')}>Calls</LowestButtonCalls>
                <LowestButtonPuts onClick={() => setCallsOrPuts('puts')}>Puts</LowestButtonPuts>
                </LowestButtons>
            
              <AutoSizer>
          {({ height, width }: {height:number, width:number}) => (
             /*  <Swipe
              onSwipeLeft={() => swipeColumn('left')}
              onSwipeRight={() => swipeColumn('right')}
              //Tolereance to avoid oversensitivity
              tolerance = { 100 }> */
                <StyledTable>
                    <Table
            height={500}
            width={width}
            rowHeight={70}
            headerHeight={70}
            rowCount={callsOrPuts === 'calls' ? sortedList.length : sortedListPuts.length}
            rowGetter={({ index } : {index:number}) => callsOrPuts === 'calls' ? sortedList[index] : sortedListPuts[index]}
            headerStyle={headerStyle}
            sort={(e:any) => sort(e)}
            sortBy={sortBy}
            rowStyle={(e:any) => rowStyle(e)}
            onRowClick={(e) => history.push(`/marked/UNI/buy`)}
            //scroll and swipe, makes sure to remember the scroll position on swipe left or right
            onScroll={(e: { scrollTop: number; }) => {
                if(e.scrollTop === scrollToValue) {
                  return
                }else if(scrollToValue!==0 && e.scrollTop === 0) {
                  return 
                }else {
                  userScrolls(e.scrollTop)
                }
              }
            }
            scrollTop={prevColumn!==null ? prevColumn : scrollToValue}
            
         >
  
                    <Column
                    label='strike'
                    dataKey='strike'
                    width={200}
            
                    />
                    <Column
                    width={200}
                    label={activeColumn}
                    dataKey={activeColumn}
                    />
                  </Table>
                </StyledTable>
             /*  </Swipe>  */
          )}
          </AutoSizer>
            </div>
          //If it's not mobileView then no need to show the "choose column box" and instead we show
          //the desktop view with all columns. We don't use Autosizer here and instead just count the 
          //amount of columns * the size and use that as width, since we want to be able to scroll sideways
          : 
          <div>
            <LowerbodyHorizontalButtons>
            <div>
                  <LowerbodyHorizontalButton>
                    Series
                    <select id='selectBoxLeftButton'>
                     <option value={'$WETH/USDC'}>$WETH/USDC</option>
                     </select>

                    </LowerbodyHorizontalButton>
                </div>
                <div>
                <LowerbodyHorizontalButton>
                Expiry
                    <select id='selectBoxLeftButton'>
                     <option value={'Sat, 27 Feb 2021'}>Sat, 27 Feb 2021</option>
                     </select>

                    </LowerbodyHorizontalButton>
                </div>
                <StyledViewImg color="white" height="60px" width="70px" src={MobileOnIcon} onClick={() => setMobileView(!mobileView)}/>
            </LowerbodyHorizontalButtons>
            <LowestButtons>
            <LowestButtonCalls onClick={() => setCallsOrPuts('calls')}>Calls</LowestButtonCalls>
            <LowestButtonPuts onClick={() => setCallsOrPuts('puts')}>Puts</LowestButtonPuts>
                </LowestButtons>
            
             <StyledTable>
              <Table
              width={600}
              height={820}
              headerHeight={70}
              rowHeight={50}
              rowStyle={(e:any) => rowStyle(e)}
              rowCount={callsOrPuts === 'calls' ? sortedList.length : sortedListPuts.length}
              rowGetter={({ index } : {index:number}) => callsOrPuts === 'calls' ? sortedList[index] : sortedListPuts[index]}
              headerStyle={headerStyle}
              onRowClick={(e) => history.push(`/marked/UNI/buy`)}
              sort={(e: { sortBy: any; sortDirection:String; }) => sort(e)}
              >
                {uniqueValues.map((i: any) => 
                <Column label={i}
                dataKey={i}
                width={(600/uniqueValues.length)}
                />)}
            </Table>
          </StyledTable>
        </div>
            
            //If it's not "isMobile" then do show the desktop version(difference is AutoSizer, so is
            // always 100% width)
         : ''}
        {!isMobile ? <div><LowerbodyHorizontalButtonsDesktop>
          <div>
                  <LowerbodyHorizontalButton>
                    Series
                    <select id='selectBoxLeftButton'>
                     <option value={'$WETH/USDC'}>$WETH/USDC</option>
                     </select>

                    </LowerbodyHorizontalButton>
                </div>
                <div>
                <LowerbodyHorizontalButton>
                Expiry
                    <select id='selectBoxLeftButton'>
                     <option value={'Sat, 27 Feb 2021'}>Sat, 27 Feb 2021</option>
                     </select>

                    </LowerbodyHorizontalButton>
                </div>
            </LowerbodyHorizontalButtonsDesktop>
            <LowestButtons>
            <LowestButtonCalls onClick={() => setCallsOrPuts('calls')}>Calls</LowestButtonCalls>
            <LowestButtonPuts onClick={() => setCallsOrPuts('puts')}>Puts</LowestButtonPuts>
                </LowestButtons>
                <AutoSizer>
          {({ height, width }: {height:number, width:number}) => (
            <StyledTable>
              <Table
              width={width}
              height={320}
              headerHeight={70}
              rowHeight={50}
              rowStyle={(e:any) => rowStyle(e)}
              rowCount={callsOrPuts === 'calls' ? sortedList.length : sortedListPuts.length}
              rowGetter={({ index } : {index:number}) => callsOrPuts === 'calls' ? sortedList[index] : sortedListPuts[index]}
              headerStyle={headerStyle}
              onRowClick={(e) => history.push(`/marked/UNI/buy`)}
              sort={(e: any) => sort(e)}
              >
                {uniqueValues.map((i: any) => 
                <Column label={i}
                dataKey={i}
                width={(width/uniqueValues.length)}
                />)}
            </Table>
          </StyledTable>
          )}
        </AutoSizer>
        </div>
  : '' }
      </StyledContainer>
    )
  }
  
  export default TableView