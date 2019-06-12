import React from 'react'

class Signup extends React.Component{

    state = {
        name: "",
        location: "",
        username: "",
        password: "",
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
                        Username: <input onChange={this.handleChange} name='username' value={this.state.username} placeholder='username'/> <br/>
                        Password: <input onChange={this.handleChange} name='password' value={this.state.password} placeholder='password'/> <br/>
                        <input type='submit' value='Submit'/> 
                    </form>
            </div>
        )
    }
}

export default Signup