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
  user: null,
  favorites: [],
  selectedFood: null,
  mostFavorited: {},
  optionsArray: [],
  allPosts: [],
  usersArray: [],
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

    case "FETCH_USER":
      return {...state, currentUser: action.payload.user}

    case "FETCH_USER_AND_FAVORITES":
      // debugger
      return {...state, user: action.payload, favorites: action.payload.favorites}
      
    case "SELECTED_FOOD":
      // debugger
      return {...state, selectedFood: action.payload}

    case "ADD_FAVORITES":
      return {...state, favorites: action.payload}

    case "DELETE_FAVORITE":
      console.log('deleted')
      return {...state, favorites: action.payload}

    case "SET_MOST_FAVORITE_MEAL":
      return {...state, mostFavorited: action.payload}

    case "DROPDOWN_ARRAY":
      return {...state, optionsArray: action.payload}

    case "ALL_POSTS":
      return {...state, allPosts: action.payload}

    case "ADD_POST":
      return {...state, allPosts: action.payload}

    case "SET_USER_ARRAY":
      return {...state, usersArray: action.payload}

    case "EDITED_USER":
      debugger
      // return {...state,}

    default:
      return state
  }
}

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store} >
      <Router>
        <Route path="/" 
          render={(routerProps) => {
            return <App {...routerProps}/>
          }}
        />
      </Router>
    </Provider>
    , document.getElementById('root'));

serviceWorker.unregister();

