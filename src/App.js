import React from 'react';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import User from './User';
import Explore from './Explore';
import Loader from './Loader';
import Forum from './Forum';
import { Switch, Route, Redirect, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Label, Icon } from 'semantic-ui-react'


class App extends React.Component{

  
  componentDidMount(){
  
    fetch('http://localhost:3000/foods')
    .then(response => response.json())
    .then(mealsJSON => {
        this.props.fetchAllFood(mealsJSON)
    })
    .then(this.fetchUser)
  }
  
  fetchUser = () => {
    if(localStorage.token){
      fetch('http://localhost:3000/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      }).then(res => res.json())
      .then(userData => {
        this.props.fetchUser(userData)
      })
    }
  }

  render(){
    const currentUserID = this.props.currentUser ? this.props.currentUser.id : null
    return (
      <div className='app'>
        <div className='navbar'>
          <div className="topnav">
            <a href="http://localhost:3001/home">Home</a>
            <a href="http://localhost:3001/explore">Explore</a>
            <a href="http://localhost:3001/forum">Forum</a>
            {this.props.currentUser ? null : <a href="http://localhost:3001/login">Log In</a> }
            {this.props.currentUser ?  <b><Link to={`/users/${currentUserID}`} >Profile</Link></b> : null}
             
          </div>
        </div>

        <div className='profile-icon'>
          {this.props.currentUser ?
            <Label as='a' image size='medium' floated='right'>
              <a href={`http://localhost:3001/users/${currentUserID}`}><img src={this.props.currentUser ? this.props.currentUser.user_picture: null} /></a>
              {this.props.currentUser ? this.props.currentUser.username : null}
              <Label.Detail onClick={this.props.logOut}>
                LogOut
                {this.props.currentUser ?  <Icon disabled name='power off'/> : null}
              </Label.Detail>
            </Label>
              :
              null
          }
        </div>

        <div className='body'>
          <Switch>
            <Route
              path='/login'
              render={(routerProps) => {
                return <Login {...routerProps} /> 
              }}
            />
            <Route
              path='/signup'
              render={(routerProps) => {
                return <Signup {...routerProps}  setCurrentUser={this.setCurrentUser}/> 
              }}
            />
            <Route
              path='/explore'
              render={(routerProps) => {
                return this.props.allFood.length === 0 ? <Loader/> : <Explore {...routerProps} />
              }}
            />
            <Route
              path='/forum'
              render={(routerProps) => {
                return this.props.allFood.length === 0 ? <Loader/> : <Forum {...routerProps} />
              }}
            />
            <Route 
              path="/users/:id"
              render={(routerProps) => {
                return this.props.currentUser ? <User allFood={this.props.allFood} {...routerProps}/> : <Loader/> 
              }}
            />
            <Route
              path='/home'
              render={(routerProps) => {
                return <Home {...routerProps}/> 
              }}
            />
            <Route render={() => <Redirect to='/home'/> }/>
          </Switch>
        </div>

        <div className='footer'>
          <p>Powered by Swag</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  // get state
  return {
    currentUser: state.currentUser,
    allFood: state.allFood
  }
}

function mapDispatchToProps(dispatch,props){
  //edit states
  return {
    setCurrentUser: (user) => {
      dispatch({type: "SET_CURRENT_USER", payload: user})
    },
    logOut: (user) => {
      props.history.push('/login')
      dispatch({type: "LOG_OUT", payload: user})
    },
    fetchAllFood: (food) => {
      // debugger
      dispatch({type: "FETCH_ALL_FOOD", payload: food}) 
    },
    fetchUser: (user) => {
      dispatch({type: "FETCH_USER", payload: user})
    }
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));