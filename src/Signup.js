import React from 'react'
import { connect } from 'react-redux';
import { Button, Form, Segment, Container, Header} from 'semantic-ui-react';


class Signup extends React.Component{

    state = {
        name: "",
        location: "",
        username: "",
        password: "",
        user_picture: "https://is2-ssl.mzstatic.com/image/thumb/Purple71/v4/c9/f9/d1/c9f9d1e4-b9f1-6bf2-5846-199528ddab8e/source/512x512bb.jpg",
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
            <Container>
                <Segment>        
                    <Form onSubmit={ this.handleSubmit }>
                        <Header as='h1' floated='left'>Signup</Header> <br/><br/><br/>
                        <Header as='h4' floated='left'>Name</Header>
                        <Form.Field>
                            <input onChange={this.handleChange} name='name' value={this.state.name} placeholder='name'/>
                        </Form.Field>

                        <Header as='h4' floated='left'>Location</Header>
                        <Form.Field>
                        <input onChange={this.handleChange} name='location' value={this.state.location} placeholder='location'/>
                        </Form.Field>

                        <Header as='h4' floated='left'>Profile Picture</Header>
                        <Form.Field>
                        <input onChange={this.handleChange} name='user_picture' value={this.state.user_picture} placeholder='profile picture'/> 
                        </Form.Field>

                        <Header as='h4' floated='left'>Username</Header>
                        <Form.Field>
                        <input onChange={this.handleChange} name='username' value={this.state.username} placeholder='username'/> 
                        </Form.Field>

                        <Header as='h4' floated='left'>Password</Header>
                        <Form.Field floated='left'>
                                <input onChange={this.handleChange} name='password' value={this.state.password} type='password' placeholder='Password' />
                        </Form.Field>
                        <br />
                        <Button positive type='submit'>Submit</Button>
                    </Form>
                    <br /><br />
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