import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";

// const a = fetch('https://hacker-news.firebaseio.com/v0/')
// a.then(i=>console.log(i.json()))

const firebaseConfig = {
  apiKey: "AIzaSyAZnM8jYKmLANn4Xxu5AVqNdCp_7ZsFwjA",
  authDomain: "remember-ec7ba.firebaseapp.com",
  projectId: "remember-ec7ba",
  storageBucket: "remember-ec7ba.appspot.com",
  messagingSenderId: "688600179299",
  appId: "1:688600179299:web:95040cd26621b91329ce56",
  measurementId: "G-3M5HES40EB",
  databaseURL: "https://remember-ec7ba-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const provider = new GoogleAuthProvider();
export const auth = getAuth();

interface AppContextInterface {
  auth: any
 
}



export const AppContext = createContext<AppContextInterface | null >(null);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
 
);
root.render(
  <AppContext.Provider value={{
    auth,
  }}>
    <App />
  </AppContext.Provider>,

);


