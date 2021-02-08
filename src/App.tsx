import React from 'react';
import logo from './logo.svg';
import Header from './components/headerComponents/Header'
import Frontpage from './components/Frontpage'
import Marked from './components/Marked'
import MarkedItem from './components/MarkedItem'
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

interface Props {
  params: any;
}

const data = [{
  name:'Uniswap', price:'$18.62', risk:'4', oneday:'-2%', oneweek:'+1%', oneyear:'+1%', 
  abbreviation:'UNI'
},
{name:'Ethereum', price:'$25.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH'}
]

const myData = [{
  name:'Uniswap', price:'$18.62', risk:'4', oneday:'-2%', oneweek:'+1%', oneyear:'+1%', 
  abbreviation:'UNI', profit: '$200.33', profitpercentage: '10%', avgstrike: '$16'
},
{name:'Ethereum', price:'$25.62', risk:'2', oneday:'+10%', oneweek:'+4%', oneyear:'-5%', 
abbreviation: 'ETH', profit: '$50.33', profitpercentage: '2%', avgstrike: '$25'}
]

const params = ''

function App() {
    return <Router>
      <div>
        <Route exact path="/" render={() => <div>
            <Header/><Frontpage/>
          </div>} />
          
        <Route exact path="/marked" render={() => <div>
            <Header/><Marked/>
          </div>} />
          <Route path="/marked/:slug" render={({match}: {match:Props}) =>  <div>
            <Header/><MarkedItem data={data} myData={myData} {...match.params.slug}/>
          </div>} />
      </div>
    </Router>
}

export default App;
