import React, { useContext, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseConstent } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

export default function Signup() {
  const [username, setUsername] = useState('')
  const [mobile, setMoblie] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { firebase } = useContext(FirebaseConstent)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsernameError('');
    setMobileError('');
    setEmailError('');
    setPasswordError('');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{6,}$/; 


    if (!username.trim()) {
      setUsernameError('Username is required');
      return false;
    }

    if (!mobile.trim() || mobile.length !== 10) {
      setMobileError('Please enter a valid 10-digit mobile number');
      return false;
    }

    if (!email.trim() || !emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      return false;
    }

    if (!password.trim() || !passwordRegex.test(password)) {
      setPasswordError('Password must be at least 6 characters');
      return false;
    }

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user.updateProfile({ displayName: username })
          .then(() => {
            firebase.firestore().collection('users').doc(result.user.uid) 
              .set({ 
                id:result.user.uid,
                username: username,
                phone: mobile
              })
              .then(() => {
                history.push("/login");
              })
              .catch((error) => {
                console.error('Error adding user:', error);
              });
          })
          .catch((error) => {
            console.error('Error updating user profile:', error);
          });
      })
      .catch((error) => {
        console.error('Error creating user:', error);
      });
    }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt=''></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => {setUsername(e.target.value)
            setUsernameError('')}}
            id="fname"
            name="name"
            defaultValue="John"
          />
          
          {usernameError && <span className="error">{usernameError}</span>}
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => {setEmail(e.target.value)
            setEmailError('')}}
            id="fname"
            name="email"
            defaultValue="John"
          /><br/>
          {emailError && <span className="error">{emailError}</span>}
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={mobile}
            onChange={(e) => {setMoblie(e.target.value)
            setMobileError('')}}
            id="lname"
            name="phone"
            defaultValue="Doe"
          /><br/>
          {mobileError && <span className="error">{mobileError}</span>}
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
              setPasswordError("")
            }}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          {passwordError && <span className="error">{passwordError}</span>}
          <br />
          <br />
          <button>Signup</button>
        </form>
        <a href='#er' onClick={() => {
          history.push("/login")
        }}>Login</a>
      </div>
    </div>
  );
}
