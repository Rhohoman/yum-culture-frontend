import React from 'react'

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
    }


    render(){
        return(
            <div>
                <h1>Login Page</h1>

                <form onSubmit={ this.handleSubmit }>
                    Username: <input onChange={this.handleChange} name='username' value={this.state.username} placeholder='username'/> <br/>
                    Password: <input onChange={this.handleChange} name='password' value={this.state.password} placeholder='password'/> <br/>
                    <input type='submit' />
                </form>

                <br/>

                <div>
                    <p>Haven't Signed up yet?</p>
                    <a href="http://localhost:3001/signup">Sign Up</a>
                </div>
            </div>
        )
    }
}

export default Login