import React from 'react'
import { Dropdown, Card, Image, Segment, Header, Icon, Container, Button, Modal, Form, Confirm } from 'semantic-ui-react'
import FavoritesList from './FavoritesList';
import { connect } from 'react-redux';
import Loader from './Loader';


class User extends React.Component{

    state = {
        confirmButton: false,
        user: {},
    }

    componentDidMount(){
        const userId = this.props.match.params.id
        fetch(`http://localhost:3000/users/${userId}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(response => response.json())
        .then(response => {
            this.props.fetchUserData(response)
            this.changeKeyForSearch()
            this.setState({
                user: response
            })
        })
        .then( () => 
            fetch(`http://localhost:3000/users`)
            .then(response => response.json())
            .then(users =>
                this.props.setUsersArray(users)
            )
        )
    }

    changeKeyForSearch = () => {
        const copyArrayFood = this.props.allFood
        const fixedArray = copyArrayFood.map( food => {
            food["text"] = food["name"]
            return food 
        } )

        this.props.setDropdownOptions(fixedArray)
        // return fixedArray
    }

    handleChange = (e) => {
        const selectedFoodID = e.target.id
        fetch(`http://localhost:3000/foods/${selectedFoodID}`)
        .then(response => response.json())
        .then(response => {
            this.props.handleChange(response)
            this.postFavorites()
        })
    }

    postFavorites = () => {
        const names = this.props.favorites.map(fav => fav.name)
        if (!names.includes(this.props.selectedFood.name)) {
            fetch(`http://localhost:3000/favorites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ 
                    user_id: this.state.user.id,
                    food_id: this.props.selectedFood.id,
                    name: this.props.selectedFood.name,
                    image: this.props.selectedFood.image,
                    categories: this.props.selectedFood.categories,
                    youtube_url: this.props.selectedFood.youtube_url,
                    area: this.props.selectedFood.area,
                    instructions: this.props.selectedFood.instructions
                })
            })
            .then(res => res.json())
            .then(data => {this.addingMealToFavorites(data)})
        } else {
            alert('You cannot add that favorite')
        }
    }

    addingMealToFavorites = (favorite) => {
        const copyFavoritesArray = [...this.props.favorites]
        copyFavoritesArray.push(favorite)
        this.props.addFavorites(copyFavoritesArray)
    }

    editButton = (event, oldUserInfo) => {
        // debugger
        console.log('event',event.target)
        console.log('old user', oldUserInfo)
        
        let userId = oldUserInfo.id
        let updatedUsername = event.target.querySelector('.username-input').value
        let updatedName = event.target.querySelector('.name-input').value
        let updatedLocation = event.target.querySelector('.location-input').value

        console.log('username', updatedUsername)
        console.log('name', updatedName)
        console.log('location', updatedLocation)
        //here I open up a modal to edit the users information

        fetch(`http://localhost:3000/users/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                username: updatedUsername,
                name: updatedName,
                location: updatedLocation,
            })
        })
        .then(res => res.json())
        .then(data => {this.updatingUsersArray(data)})
        .then(() => this.props.history.push('/home'))
    }

    updatingUsersArray = (updatedUserInfo) => {
        let index = this.props.usersArray.findIndex( user => user.id === updatedUserInfo.id )
        let copyUsersArray = [...this.props.usersArray]

        copyUsersArray[index] = updatedUserInfo
        // debugger
        this.props.editingUserInfo(copyUsersArray)
        this.props.updateCurrentUser(updatedUserInfo)
    }



    open = () => {
        // alert('🤪🤪🤪 Sike this feature is not in yet tune in tho')
    }
    // close = () => this.setState({ confirmButton: false })

    render(){
        // console.log(this.state.user ? this.state.user.favorites : null)
        console.log('currentUser', this.props.currentUser)
        console.log('state user', this.props.user)
        return(
            <div>
                {this.props.currentUser ?
                    <div>
                        <Container>
                            <Segment>
                                {this.props.currentUser.username === this.state.user.username ?
                                    <Modal trigger={<Button floated='right' >Edit</Button>}>
                                        <Modal.Header>Edit Form</Modal.Header>
                                        <Modal.Content>
                                            <Form onSubmit={(event) => this.editButton(event,this.state.user)}>
                                            {/* <Form > */}
                                                <Header as='h4' floated='left'>Username</Header>
                                                    <Form.Field name='username' >
                                                        <input class='username-input' placeholder={this.state.user.username}/>
                                                    </Form.Field>
                                                <Header as='h4' floated='left'>Name</Header>
                                                    <Form.Field name='name' >
                                                        <input class='name-input' placeholder={this.state.user.name}/>
                                                    </Form.Field>
                                                <Header as='h4' floated='left'>Location</Header>
                                                    <Form.Field name='location' >
                                                        <input class='location-input' placeholder={this.state.user.location}/>
                                                    </Form.Field>
                                                <Button onClick={this.open} positive>Submit Changes</Button>
                                                <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.close} />
                                            </Form>
                                        </Modal.Content>
                                    </Modal>
                                :
                                    null
                                }

                                {/* this is where the users stuff comes in */}

                                <Header as="h1">{this.props.currentUser ? <p>{this.state.user.username}</p> : null}</Header>
                                {this.props.currentUser ? <Image className="centered" src={this.state.user.user_picture} size="medium" circular /> : null}
                                
                                <Card fluid>
                                    <Card.Content>
                                    <Card.Header>{this.props.currentUser ? <p>Name: {this.state.user.name}</p> : null}</Card.Header>
                                    <Card.Meta>Joined in 2019</Card.Meta>
                                    <Card.Description>{this.props.currentUser ? <p>Location: {this.state.user.location}</p> : null}</Card.Description>
                                    </Card.Content>

                                    {/* <Card.Content extra>
                                    <a>
                                        <Icon name="user" />
                                        10 Posts
                                    </a>
                                    </Card.Content> */}

                                </Card>
                            </Segment>
                        </Container>

                        {this.props.currentUser.username === this.state.user.username ?
                            <div>
                                <Container>
                                    <div className='title'>
                                        <div className='cursive'>
                                            <h2>Add an item to your preferences</h2>
                                        </div>
                                    </div>
                                    <Dropdown
                                    onChange={this.handleChange}
                                    placeholder='Select an option to add'
                                    fluid
                                    search
                                    selection
                                    value={this.props.selectedFood ? this.props.selectedFood.name : ''}
                                    selectOnNavigation={false}
                                    options={this.props.optionsArray}
                                    />
                                </Container>
                                {this.props.favorites.length === 0 ? null : <FavoritesList favorites={this.props.favorites} />}
                            </div>
                            :
                            null
                        }
                    </div>
                        : 
                    <Loader/>
                }
            </div>
        )
    }
}

function mapStateToProps(state){
    // get state
    return {
        currentUser: state.currentUser,
        user: state.user,
        usersArray: state.usersArray,
        favorites: state.favorites,
        selectedFood: state.selectedFood,
        optionsArray: state.optionsArray,
    }
}
  
function mapDispatchToProps(dispatch){
    //edit states
    return {
        fetchUserData: (userData) => {
            dispatch({type: "FETCH_USER_FAVORITES", payload: userData})
        },
        handleChange: (selectedFood) => {
            dispatch({type: "SELECTED_FOOD", payload: selectedFood})
        },
        addFavorites: (favorites) => {
            dispatch({type: "ADD_FAVORITES", payload: favorites})
        },
        setDropdownOptions: (foods) => {
            dispatch({type: "DROPDOWN_ARRAY", payload: foods})
        },
        setUsersArray: (users) => {
            dispatch({type: "SET_USERS_ARRAY", payload: users})
        },
        editingUserInfo: (users) => {
            dispatch({type: "EDITED_USER", payload: users})
        },
        updateCurrentUser: (user) => {
            dispatch({type: "UPDATE_CURRENT_USER", payload: user})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(User) 