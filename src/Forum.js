import React from 'react'
import { Feed, Icon, Form, Input, TextArea, Button, Select, Modal, Container, Label }from 'semantic-ui-react';
import { connect } from 'react-redux';


class Forum extends React.Component{

    state = {
        username: '',
        food: '',
        opinion: '',
        usersArray: [],
        user_id: 0,
        food_id: 0,
        food_image_url: '',
        user_image_url: '',
    }


    componentDidMount(){
        fetch(`http://localhost:3000/posts`)
        .then(response => response.json())
        .then( response => {
            //here I take response which is the posts and set it to state array
            this.props.setPosts(response)
            this.changeKeyForSearch()
        })
        .then( () => 
            fetch(`http://localhost:3000/users`)
            .then(response => response.json())
            .then(users => 
                this.setState({
                    usersArray: users
                })
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
    }
    
    handleChange = (event) => {
        console.log('value: ', event.target.value)
        //here I get a users name
        // debugger
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleChangeFood = (event) => {
        // debugger
        console.log(event.target.innerText)
        //thing about this is all I get is a name text which means I have to find that object wiht its name
        this.setState({
            food: event.target.innerText
        })
    }
    
    handleChangeOpinion = (event) => {
        console.log(event.target.value)
        this.setState({
            opinion: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        this.getNecessaryInfo()
    }

    getNecessaryInfo = () => {
        this.findingUserAndFood()
    }

    findingUserAndFood = () => {
        let userObj = this.state.usersArray.find(user => user.username === this.state.username)
        let allFoodCopy = this.props.allFood
        let foodObj = allFoodCopy.find(food => food.name === this.state.food)
        this.setState({
            user_id: userObj.id,
            user_image_url: userObj.user_picture,
            food_id: foodObj.id,
            food_image_url: foodObj.image,
        },() => this.postThePost())
    }

    postThePost = () => {
        // debugger
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.state.user_id,
                // this.props.currentUser.id
                food_id: this.state.food_id,
                username: this.state.username,
                image_url: this.state.food_image_url,
                profile_image_url: this.state.user_image_url,
                text: this.state.opinion,
                likes: 0,
                dislikes: 0,
            })
        })
        .then(res => res.json())
        .then(data => {
            // debugger
            this.addAPost(data)
        })
    }

    addAPost = (post) => {
        // debugger
        let copyAllPosts = [...this.props.allPosts]
        copyAllPosts.push(post)
        this.props.addPost(copyAllPosts)
        //reducer
    }

    findUserReturnName = (postUser) => {
        if(postUser){ 
            let userObj = this.state.usersArray.find(user => user.id === postUser.id)
            return userObj.username
        }
    }

    incrementLike = (postId,likes) => {
        // event would be the button on the post which I can also pass in to change its data and then send it to the back
        //if the button is a like add one to lieks if dislike add one to dislike
        console.log('postid: ',postId)
        console.log('likes: ',likes)
        let newLikes = likes + 1
        fetch(`http://localhost:3000/posts/${postId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                likes: newLikes
            })
        })
        .then(response => response.json())
        .then(data => console.log(data))
    }

    render(){
        return(
            <div >
                <Container>
                <h1>Forum</h1>
                    {this.props.allPosts ? 
                        this.props.allPosts.map(post => 
                            <Feed size='large'>
                            {console.log(post)}
                                <Feed.Event>
                                <Feed.Label image={post.profile_image_url} />
                                    <Feed.Content>

                                        <Feed.Summary>
                                        <a>{post.username}</a>
                                        {/* <Feed.Date>3 days ago</Feed.Date> */}
                                        </Feed.Summary>

                                        <Feed.Extra text>
                                            {post.text}
                                        </Feed.Extra>

                                        <Feed.Extra images>
                                            <a>
                                                <img src={post.image_url} />
                                            </a>
                                        </Feed.Extra>

                                        <Feed.Meta>
                                            <Button as='div' labelPosition='right' onClick={() => this.incrementLike(post.id,post.likes)} value={post.likes}>
                                                <Button icon >
                                                    <Icon name='heart' />
                                                    Like
                                                </Button>
                                                <Label as='a' basic pointing='left'>
                                                    {post.likes}
                                                </Label>
                                            </Button>

                                            <Button as='div' labelPosition='left'>
                                                <Label as='a' basic pointing='right'>
                                                    {post.dislikes}
                                                </Label>
                                                <Button icon >
                                                    <Icon name='heart' />
                                                    Dislike
                                                </Button>
                                            </Button>
                                        </Feed.Meta>


                                    </Feed.Content>
                                </Feed.Event>        
                            </Feed>                
                        )
                    :
                        null
                    }
                
                {this.props.currentUser ? 

                <Modal trigger={<Button>Write a Post</Button>}>
                    <Modal.Header>Form</Modal.Header>
                    <Modal.Content >
                    <Form onSubmit={(event) => this.handleSubmit(event)}>
                        <Form.Group widths='equal'>
                        <Form.Field
                            id='form-input-control-username'
                            control={Input}
                            label='Username'
                            placeholder='username'
                            name='username'
                            value={this.state.username}
                            onChange={this.handleChange}
                            />
                            {/* {console.log(this.state.food)} */}
                        <Form.Field
                            control={Select}
                            options={this.props.optionsArray}
                            label={{ children: 'Food', htmlFor: 'form-select-control-gender' }}
                            placeholder={this.state.food ? this.state.food : 'Search Food'}
                            search
                            searchInput={{ id: 'form-select-control-food' }}
                            name='food'
                            value={this.state.food}
                            onChange={this.handleChangeFood}
                            />
                        </Form.Group>

                        <Form.Field
                            id='form-textarea-control-opinion'
                            control={TextArea}
                            label='Opinion'
                            placeholder='Opinion'
                            name='opinion'
                            onChange={this.handleChangeOpinion}
                            />

                        <Form.Field
                            id='form-button-control-public'
                            control={Button}
                            content='Post'
                            />
                    </Form>
                    </Modal.Content>
                </Modal>
                    : 
                null
                }
                </Container>
            </div>
        )
    }
}

function mapStateToProps(state){
    // get state
    return {
        allFood: state.allFood,
        optionsArray: state.optionsArray,
        allPosts: state.allPosts,
        currentUser: state.currentUser,
    }
}

function mapDispatchToProps(dispatch){
    //edit states
    return {
        setDropdownOptions: (foods) => {
            dispatch({type: "DROPDOWN_ARRAY", payload: foods})
        },
        setPosts: (posts) => {
            dispatch({type: "ALL_POSTS", payload: posts})
        },
        addPost: (post) => {
            dispatch({type: "ADD_POST", payload: post})
        },
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Forum)