// Import the functions you need from the SDKs you need

import app from "firebase/app";

const config = {

    apiKey: "AIzaSyBBEm407OpzmH74anDTjSKsukRVZwOo2F8",
  
    authDomain: "chess-42605.firebaseapp.com",
  
    databaseURL: "https://chess-42605-default-rtdb.europe-west1.firebasedatabase.app",
  
    projectId: "chess-42605",
  
    storageBucket: "chess-42605.appspot.com",
  
    messagingSenderId: "568691571548",
  
    appId: "1:568691571548:web:d5adcdd104dd5512381f99"
  
  };


class Firebase{

    constructor(){
        app.initializeApp(config);
    }
}


// Your web app's Firebase configuration



export default Firebase;


// Initialize Firebase

const app = initializeApp(firebaseConfig);