import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Context from './store/Context';
import { FirebaseConstent } from './store/Context';
import firebase from './firebase/config';
ReactDOM.render(
    <FirebaseConstent.Provider value={{firebase}}>
        <Context>
            <App />
        </Context>
    </FirebaseConstent.Provider>
, document.getElementById('root'));
