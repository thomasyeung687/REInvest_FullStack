import {useState,useEffect} from 'react';
import {Route, Redirect} from 'react-router-dom'
import axios from 'axios';
import Cookie from 'js-cookie';


export const PrivateRoute = ({ component: Component, ...rest }) => {

  

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
  const [isLog, setLog] = useState(<h1>Loading...</h1>);
  const [route, setRoute] = useState(null);
  useEffect(()=>{
    handleAuthVerification();
    console.log(isLog);
    setTimeout(()=>{
      setRoute(<Redirect to = '/login'/>);
    },1000)
  },isLog)
  

  return (
    <Route {...rest} render={(props) => (
      isLog == true ? <Component {...props} />
            : route
        )} 
    />
  )
}