import firebase from "firebase";
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwvVsilfQoh1ErpBZj1p7munkxgMBho6w",
  authDomain: "fir-project-14987.firebaseapp.com",
  projectId: "fir-project-14987",
  storageBucket: "fir-project-14987.appspot.com",
  messagingSenderId: "243135712274",
  appId: "1:243135712274:web:83387d354147ba7ef5dccb",
  measurementId: "G-CPJFTBKS65"
};

export default firebase.initializeApp(firebaseConfig);
