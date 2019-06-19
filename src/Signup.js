import React from 'react'
import { connect } from 'react-redux';

class Signup extends React.Component{

    state = {
        name: "",
        location: "",
        username: "",
        password: "",
        user_picture: "",
    }
    handleChange = (event) => {
        console.log(event.target.name,": ", event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('submitted', this.state)

        fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(this.state)
        }).then(response => response.json())
        .then((response) => { 
            if (response.errors){
                alert(response.errors)
            } else {
                this.props.setCurrentUser(response)
            }
        })
    }


    render(){
        return(
            <div>
                <h1>Signup</h1>
                    <form onSubmit={this.handleSubmit} >
                        Name: <input onChange={this.handleChange} name='name' value={this.state.name} placeholder='name'/> <br/>
                        Location: <input onChange={this.handleChange} name='location' value={this.state.location} placeholder='location'/> <br/>
                        Profile Picture: <input onChange={this.handleChange} name='user_picture' value={this.state.user_icture} placeholder='profile picture'/> <br/>
                        Username: <input onChange={this.handleChange} name='username' value={this.state.username} placeholder='username'/> <br/>
                        Password: <input onChange={this.handleChange} name='password' value={this.state.password} placeholder='password' type='password'/> <br/>
                        <input type='submit' value='Submit'/> 
                    </form>
            </div>
        )
    }
}

function mapStateToProps(state){
    // get state
    return {
      currentUser: state.currentUser,
    }
}
  
function mapDispatchToProps(dispatch,props){
    //edit states
    return {
        setCurrentUser: (user) => {
            props.history.push('/home')
            dispatch({type: "SET_CURRENT_USER", payload: user})
        },
    }
}


export default connect(mapStateToProps,mapDispatchToProps) (Signup);