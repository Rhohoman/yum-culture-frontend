import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const defaultState={
  currentUser: null,
  allFood: [],
}

function reducer(state = defaultState, action){

  switch(action.type){
    case "SET_CURRENT_USER":
      localStorage.setItem("token", action.payload.jwt)
      return {...state, currentUser: action.payload.user}
    case "LOG_OUT":
      // debugger
      localStorage.removeItem('token')
      return {...state, currentUser: action.payload.user}
    case "FETCH_ALL_FOOD":
      // debugger
      return {...state, allFood: action.payload}
    default:
      return state
  }
}

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store} >
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();
