import React from 'react'
import { connect } from 'react-redux';
import { Button, Form, Segment, Container, Header} from 'semantic-ui-react';

class Login extends React.Component{

    state = {
        username: '',
        password: '',
    }
    
    handleChange = (event) => {
        console.log(event.target.name,": ", event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        console.log('Logging in: ', this.state)
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Accepts": 'application/json',
            },
            body: JSON.stringify({auth : this.state})
        }).then(response => response.json())
        .then((response) => { 
            if (response.errors){
                alert(response.errors)
            } else {
                this.props.setCurrentUser(response)
            }
        })
        .then(() => this.props.history.push('/home')) 
    }


    render(){
        return(
            <Container>
                <Segment>        
                    <Form onSubmit={ this.handleSubmit }>
                        <Header as='h1' floated='left'>Login</Header> <br/><br/><br/>
                        <Header as='h4' floated='left'>Username</Header>
                        <Form.Field>
                            <input onChange={this.handleChange} name='username' value={this.state.username} placeholder='Username' />
                        </Form.Field>

                        <Header as='h4' floated='left'>Password</Header>
                        <Form.Field floated='left'>
                                <input onChange={this.handleChange} name='password' value={this.state.password} type='password' placeholder='Password' />
                        </Form.Field>

                        <Button type='submit'>Submit</Button>
                    </Form>
                    <br /><br />
                    <b>Forgot your password?  </b>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Click here to reset</a><br />
                    <b>Haven't Signed up yet?  </b>
                    <a href="http://localhost:3001/signup">Sign Up </a>
                </Segment>
            </Container>
        )
    }
}

function mapStateToProps(state){
    // get state
    return {
      currentUser: state.currentUser,
    }
}
  
function mapDispatchToProps(dispatch){
    //edit states
    return {
        setCurrentUser: (user) => {
            dispatch({type: "SET_CURRENT_USER", payload: user})
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);