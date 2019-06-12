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

    
      return {...state, currentUser: action.payload}
    default:
      return state
  }
}


	// setCurrentUser = (data) => {
	// 	localStorage.setItem("token", data.jwt)
	// 	this.setState({
	// 		currentUser: data.user
	// 	},() => console.log(this.props.currentUser))
	// }

const store = createStore(reducer)

ReactDOM.render(
    <Provider store={store} >
      <Router>
        <Route path="/" component={App} />
      </Router>
    </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
