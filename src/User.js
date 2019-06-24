import React from 'react'
import { Dropdown, Card, Image, Segment, Header, Icon, Container, Button, Modal, Form, Confirm } from 'semantic-ui-react'
import FavoritesList from './FavoritesList';
import { connect } from 'react-redux';
import Loader from './Loader';


class User extends React.Component{

    state = {
        editedUsername: '',
        editedName: '',
        editedLocation: '',
        confirmButton: false,
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
        })
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
                    user_id: this.props.user.id,
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

        console.log('event',event.target)
        console.log('old user', oldUserInfo)
        //here I open up a modal to edit the users information
        // console.log('user: ', user)
        // let userId = user.id
        // fetch(`http://localhost:3000/users/${userId}`, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Accept': 'application/json'
        //     },
        //     body: JSON.stringify({user: user})
        // })
        // .then(res => res.json())
        // .then(data => {this.props.editingUserInfo(data)})
    }

    handleFormChange = (event) => {
        //here I change the form values to state
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    open = () => {
        alert('🤪🤪🤪 Sike this feature is not in yet tune in tho')
    }
    // close = () => this.setState({ confirmButton: false })

    render(){
        // console.log(this.props.user)
        // console.log(this.state.user ? this.state.user.favorites : null)
        return(
            <div>
                {this.props.user ? 
                    <div>
                        <Container>
                            <Segment>
                                <Modal trigger={<Button floated='right' >Edit</Button>}>
                                    <Modal.Header>Edit Form</Modal.Header>
                                    <Modal.Content>
                                        {/* <Form onSubmit={(event) => this.editButton(event,this.props.user)}> */}
                                        <Form >
                                            <Header as='h4' floated='left'>Username</Header>
                                            <Form.Field>
                                                <input name='username' onChange={this.handleFormChange} value={this.state.username} placeholder={this.props.user.username}/>
                                            </Form.Field>
                                            <Header as='h4' floated='left'>Name</Header>
                                            <Form.Field>
                                                <input name='name' onChange={this.handleFormChange} value={this.state.name} placeholder={this.props.user.name}/>
                                            </Form.Field>
                                            <Header as='h4' floated='left'>Location</Header>
                                            <Form.Field>
                                                <input name='location' onChange={this.handleFormChange} value={this.state.location} placeholder={this.props.user.location}/>
                                            </Form.Field>
                                            <Button onClick={this.open} positive>Submit Changes</Button>
                                            <Confirm open={this.state.open} onCancel={this.close} onConfirm={this.close} />
                                        </Form>
                                    </Modal.Content>
                                </Modal>

                                <Header as="h1">{this.props.user ? <p>{this.props.user.username}</p> : null}</Header>
                                {this.props.user ? <Image className="centered" src={this.props.user.user_picture} size="medium" circular /> : null}
                                
                                <Card fluid>
                                    <Card.Content>
                                    <Card.Header>{this.props.user ? <p>Name: {this.props.user.name}</p> : null}</Card.Header>
                                    <Card.Meta>Joined in 2019</Card.Meta>
                                    <Card.Description>{this.props.user ? <p>Location: {this.props.user.location}</p> : null}</Card.Description>
                                    </Card.Content>

                                    <Card.Content extra>
                                    <a>
                                        <Icon name="user" />
                                        10 Posts
                                    </a>
                                    </Card.Content>
                                </Card>
                            </Segment>
                        </Container>
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
                        {this.props.favorites.length === 0 ? null : <FavoritesList favorites={this.props.favorites} />}
                        </Container>
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
      user: state.user,
      favorites: state.favorites,
      selectedFood: state.selectedFood,
      optionsArray: state.optionsArray,
    }
}
  
function mapDispatchToProps(dispatch){
    //edit states
    return {
        fetchUserData: (userData) => {
            dispatch({type: "FETCH_USER_AND_FAVORITES", payload: userData})
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
        editingUserInfo: (user) => {
            debugger
            dispatch({type: "EDITED_USER", payload:user})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(User) 