import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';
import { useReducer } from "react";
import { useLocation } from 'react-router-dom'

  export default function Navbar(props) {

    const location = useLocation();
    // console.log(location.pathname);

    const cookies = new Cookies();

    // const [, forceUpdate] = useReducer(x => x + 1, 0);

    function removeToken(){
      cookies.set('token', null)
      setTimeout(() => {
        
        // forceUpdate();

        props.render(true)
      }, 500);
    }


    return(
        <>
        <div className="navbar">
        <ul>
            <Link to="/"><li><a href="home.html">Home</a></li></Link>
            

        </ul>
        {/* <Link to="/login"><button className="login-btn">{userName===null || userName===undefined ? userName.substring(1,2) : `Login`}</button></Link> */}
        <div>
          {location.pathname != "/cart" && <button className="login-btn" onClick={removeToken}>{cookies.get('token') && "Sign Out"}</button>}
        <Link to="/cart">
        <button className="cart-btn">Cart</button>
          </Link>
        </div>
    </div>
        </>
    )
  }