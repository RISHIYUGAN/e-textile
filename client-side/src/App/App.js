import './App.css';
import React from "react"
import axios from "axios"
// import {Header} from "../header/header"
// import {Dashboard} from "../pages/dashboard/dashboard"
import {useEffect} from "react"
import {AppRouter} from "../router/Router"
import configurestore from "../Redux/store"
import { Provider } from 'react-redux';

export const store=configurestore();

function App() {
  return (
    <div className="App-container">
      <Provider store={store}>
      <AppRouter/>
      </Provider>
    </div>
  );
}

export default App;
