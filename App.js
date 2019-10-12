import React, {Component} from "react";
import Routes from "./src/Routes";
import * as firebase from "firebase";

const App = () => <Routes/>


var firebaseConfig = {
    apiKey: "AIzaSyCnUPTBufVmn946pg2bzDayzpeTRA_p8GM",
    authDomain: "myblog-153a5.firebaseapp.com",
    databaseURL: "https://myblog-153a5.firebaseio.com",
    projectId: "myblog-153a5",
    storageBucket: "",
    messagingSenderId: "1079434221316",
    appId: "1:1079434221316:web:9ce937e02247a5fb026251",
    measurementId: "G-QRNSCHXXQE"
  };

  // Initialize Firebase

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default App;

