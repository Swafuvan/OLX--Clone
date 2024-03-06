import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'; // Import useHistory
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import Home from './Pages/Home';
import Posts from './store/postContext';
import { AuthContext, FirebaseConstent } from './store/Context';

function App() {
  const { setUser, user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseConstent);
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false)
      }
    });

    return () => unsubscribe();
  }, [firebase, setUser]);

  if (user === null) {
    return <></>;
  }

  const NavigateUser = ({ path }) => {
    return window.location.href = path
  }
  return (
    <div>
      <Posts>
        <Router>
          <Route exact path="/">
            {user ? <Home /> : <NavigateUser path={'/login'} />}
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/login">
            {user ? <NavigateUser path={'/'} /> : <Login />}
          </Route>
          <Route path="/create">
            {user ? <Create /> : <NavigateUser path={'/login'} />}
          </Route>
          <Route path="/view/:id">
            {user ? <View /> : <NavigateUser path={'/login'} />}
          </Route>
        </Router>
      </Posts>
    </div>
  );
}

export default App;
