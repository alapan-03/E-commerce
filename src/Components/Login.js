import { useState, useEffect } from 'react';
import Cookies from 'universal-cookie';
import { Link, useNavigate } from "react-router-dom";



export default function Login(props) {

    let navigate = useNavigate();

    const [datum, setDatum] = useState(null);
    const [postData, setPostData] = useState({

        username: "",
        password: "",
    
      });


      const handleInputChange = (e) => {
        setPostData({
          ...postData,
          [e.target.name]: e.target.value
        });
      };
      const handleInputChange2 = (e) => {
        setPostData({
          ...postData,
          [e.target.name]: e.target.value
        });
      };


    const cookies = new Cookies();

    // function handleSubmit(){
    
    const handleButtonClick = async () => {
        try {
          let data = await fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData),
          });
    
          if (data.ok) {
            let res = await data.json();
            setDatum(res);
            cookies.set('userId', res?.id, { path: '*' });
            cookies.set('token', res?.token, { path: '*' });
            cookies.set('name', res?.firstName, { path: '*' });
            console.log(res.id);
          }
        } catch (err) {
          console.error(err);
        }
      };
    
    console.log(datum)

    setTimeout(() => {
        if(cookies.get("token"))
        navigate('/')

    }, 1000)


// }


//     fetch('https://dummyjson.com/auth/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
    
//     username: 'kminchelle',
//     password: '0lelplR',
//   })
// })
// .then(res => res.json())
// .then(console.log);

    return (

<div className="login">

          {/* <p className="login-msg">{result?.message}</p> */}

          <div className="login-cont">

          <p>Please login to continue</p>
        <p>You can only use the credentials listed on "Show Users" button</p>
       <input className="email"
            type="text"
            name="username"
            value={postData.username}
            onChange={handleInputChange} placeholder="Username"/>

            <input className="password" type="password" name="password" value={postData.password}
            onChange={handleInputChange2} placeholder="Password"/>
        <button className="login-submit" onClick={handleButtonClick}>Submit</button>
        </div>
        </div>
    )
}