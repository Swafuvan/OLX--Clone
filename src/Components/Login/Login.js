import React, { useState,useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseConstent } from '../../store/Context';

function Login() {
  const {firebase} = useContext(FirebaseConstent)
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [emailErr,setEmailErr] = useState('');
  const [passwordErr,setPasswordErr] = useState('');
  const history = useHistory()
  const handleLogin = (e)=>{
    e.preventDefault()

    setEmailErr('');
    setPasswordErr('');
    // let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/;
     if(!emailRegex.test(email.trim())){
      setEmailErr('Invalid email format');
     return false;
    }

    if (!passwordRegex.test(password.trim())) {
      setPasswordErr('Password must be at least 6 characters/digit');
      return false;
    }

    
 
    firebase.auth().signInWithEmailAndPassword(email,password).then(()=>{
      history.push("/")
    }).catch((error)=>{
      alert(error.message)
    })

    
  }

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleLogin}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)
            setEmailErr('')}}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          {emailErr && <span className='error'>{emailErr}</span>}
          <br/>
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)
            setPasswordErr('')}}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          {passwordErr && <span className='error'>{passwordErr}</span>}
          <br />
          <br />
          <button >Login</button>
        </form>
        <a onClick={()=>{
            history.push("/signup")
          }}>Signup</a>
      </div>
    </div>
  );
}

export default Login;
