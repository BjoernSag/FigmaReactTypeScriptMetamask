import React from 'react';
import DesktopBreakpoint from './responsive_utilities/desktop_breakpoint';
import LandscapeBreakpoint from './responsive_utilities/landscape_breakpoint';
import PhoneBreakpoint from './responsive_utilities/phone_breakpoint';
import Header from './components/headerComponents/Header'
import Frontpage from './components/pages/Frontpage'
import Marked from './components/pages/Market'
import MarkedItem from './components/pages/MarketItem'
import BuyOptionPage from './components/pages/BuyOptionsPage'
import BuyPage from './components/pages/BuyPage'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'




interface Props {
  params: any;
}

const data = [{
  name:'Uniswap', price:'$18.62', risk:'4', oneday:'-2%', oneweek:'+1%', oneyear:'+1%', 
  abbreviation:'UNI',  strike: '$15'
},
{name:'Uniswap', price:'$25.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', strike: '$20'},
{name:'Uniswap', price:'$25.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', strike: '$25'},
{name:'Uniswap', price:'$25.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', strike: '$30'},
{name:'Uniswap', price:'$25.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', strike: '$35'}
]

const dataPuts = [{
  name:'Uniswap', price:'$1.62', risk:'4', oneday:'-2%', oneweek:'+1%', oneyear:'+1%', 
  abbreviation:'UNI',  strike: '$2'
},
{name:'Uniswap', price:'$2.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', strike: '$3'},
{name:'Uniswap', price:'$3.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', strike: '$4'},
{name:'Uniswap', price:'$4.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', strike: '$5'},
{name:'Uniswap', price:'$5.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', strike: '$6'}
]

const myData = [{
  name:'Uniswap', price:'$18.62', risk:'4', oneday:'-2%', oneweek:'+1%', oneyear:'+1%', 
  abbreviation:'UNI', profit: '$200.33', profitpercentage: '10%', avgstrike: '$16'
},
{name:'Ethereum', price:'$25.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', profit: '$50.33', profitpercentage: '2%', avgstrike: '$25'}
]

const params = ''

const content = (isMobile:boolean, page: any) => {
  return <Router>
      <div>
        <Route exact path="/" render={() => <div>
            <Header isMobile={isMobile}/><Frontpage/>
          </div>} />
          
        <Route exact path="/marked" render={() => <div>
            <Header isMobile={isMobile}/><Marked/>
          </div>} />
          <Route exact path="/marked/:slug" render={({match}: {match:Props}) =>  <div>
            <Header isMobile={isMobile}/><MarkedItem data={data} myData={myData} {...match.params.slug}/>
          </div>} />
          <Route exact path="/marked/:slug/buyoption" render={({match} : {match:Props}) => <div>
            <Header isMobile={isMobile}/><BuyOptionPage data={data} dataPuts={dataPuts} isMobile={isMobile} myData={myData} {...match.params.slug}/>
          </div>} />
          <Route exact path="/marked/:slug/buy" render={({match} : {match:Props}) => <div>
            <Header isMobile={isMobile}/><BuyPage data={data} isMobile={isMobile} myData={myData} {...match.params.slug}/>
          </div>} />
          
      </div>
    </Router>

}
function App() {

  /*Gets the current page from redux and saves it to infoOnPage */
  let page = useSelector((state:any) => state.page)
  
    return <div>
      <PhoneBreakpoint>{content(true, page)}</PhoneBreakpoint>
      <LandscapeBreakpoint>{content(true, page)}</LandscapeBreakpoint>
      <DesktopBreakpoint>{content(false, page)}</DesktopBreakpoint>
    </div>
}

export default App;
