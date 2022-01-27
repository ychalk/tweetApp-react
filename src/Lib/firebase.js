// import firebase from "firebase";
import { initializeApp } from 'firebase/app';


import {getFirestore, collection, getDocs
} from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyAQLxDcSmXfzH1TBSRgXb3Ij_tsA7UpFmc",
    authDomain: "ychalkreact2.firebaseapp.com",
    projectId: "ychalkreact2",
    storageBucket: "ychalkreact2.appspot.com",
    messagingSenderId: "637440926153",
    appId: "1:637440926153:web:5a8c34f81144ae094a8818",
    measurementId: "G-PDLRF932SS"
  };

  // Initialize Firebase
 initializeApp(firebaseConfig);

  const db=getFirestore()

const colRef = collection(db, 'react2')
getDocs(colRef)
 .then((snapshot) =>{

     let tweets =[]
     snapshot.docs.forEach((doc)=>{
         tweets.push({...doc.data(),id:doc.id})
     })
     console.log(tweets)
 })
 .catch(err=>{
     console.log(err.message)
 })
