import {useState,useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom'
import axios from 'axios';
import Cookie from 'js-cookie';
import {loadingPage} from './loading';

import signup from "./components/Signedout/Signup";
import HomePage from "./components/Signedout/homepage";
import Homepage from './components/Signedout/homepage';

export const HomePageRoute = ({ component: Component, ...rest }) => {

  const handleAuthVerification = async () => {
    let cookieTester = Cookie.get('auth');
    if(cookieTester == null) return false;
    axios.post('http://localhost:4000/api/user/checkLoggedIn',{auth: cookieTester},{withCredentials:true}).then(res =>{
      if(res.status == 200){
        setLog(true);
      }else{
        setLog(false);
      }
    })
  }
  const [isLog, setLog] = useState(false);
  const [route, setRoute] = useState(loadingPage);
  useEffect(()=>{
    handleAuthVerification();
    console.log(isLog);
    setTimeout(()=>{
      setRoute(<Route path="/" exact render={(props) => <Homepage {...props} auth={isLog} />} />);
    },1000)
  },isLog)

  return (
    <Route {...rest} render={(props) => (
      isLog == true ? <Route path="/" exact render={(props) => <Homepage {...props} auth={isLog} />} />
            : route
        )} 
    />
  )
}