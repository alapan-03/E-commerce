import logo from './logo.svg';
import './App.css';
import SearchSection from './Components/SearchSection';
import BodySec1 from './Components/BodySec1';
import BodySec2 from './Components/BodySec2';
import { useState, useEffect } from 'react';
import Sec2Banner from './Components/Sec2Banner';
import Sec3Banner from './Components/Sec3Banner';
import BodySec3 from './Components/BodySec3';
import Login from './Components/Login';
import Cookies from 'universal-cookie';
import Users from './Components/Users';
import Cart from "./Components/Cart"
import { Link, json } from 'react-router-dom';


function App() {

  const cookies = new Cookies();

  
  const [search, setSearch] = useState();
  const [selectedItems, setSelectedItems] = useState([]);
  const [rerender, setRerender] = useState();


  const [lowPrice, setLowPrice] = useState(0);
  const [highPrice, setHighPrice] = useState(10000);

  function setPrice1(e){
    setLowPrice(e)
  }
  function setPrice2(e){
    setHighPrice(e)
  }



  

  function reRender(e){
    setRerender(e)
  }



  function searchHandler(e){
    setSearch(e);
  }

    
    return (
      cookies.get('token') && cookies.get('token')!=undefined ?
      <div className="App">

     <SearchSection 
     render={reRender} 
     searchQuery={searchHandler}/>

     <BodySec1 lowPrice={setPrice1} highPrice={setPrice2} search={search}/>
     <Sec2Banner/>
     <BodySec2 lowPrice={lowPrice} highPrice={highPrice}/>
     <Sec3Banner/>
     <BodySec3 lowPrice={lowPrice} highPrice={highPrice}/>

    </div> : (
      <div className='login-cta'>
        <p>Please login to continue</p>
        <p>You can only use the credentials listed on "Show Users"</p>
        <div>
          <Link to="/users"><button>Show users</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>
    )
  );
}

export default App;
