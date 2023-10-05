// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {GoogleAuthProvider, GithubAuthProvider, signInWithPopup, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {


  apiKey:   `${process.env.REACT_APP_apiKey}`,
  authDomain:   `${process.env.REACT_APP_authDomain}`,
  projectId: `${process.env.REACT_APP_projectId}`,
  storageBucket:`${process.env.REACT_APP_storageBucket}`,
  messagingSenderId: `${process.env.REACT_APP_messagingSenderId}`,
  appId: `${process.env.REACT_APP_appId}`
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp)
//구글, 깃허브, 이건뭐지?, 인증 / 회원가입 / 비밀번호
export {GoogleAuthProvider, GithubAuthProvider, signInWithPopup, firebaseAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail}


