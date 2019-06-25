import React from 'react'
import { Feed, Icon, Form, Header, TextArea, Button, Select, Modal, Container, Label, Segment, Divider }from 'semantic-ui-react';
import { connect } from 'react-redux';


class Forum extends React.Component{

    state = {
        food: '',
        opinion: '',
        usersArray: [],
        food_id: 0,
        foodName: '',
        food_image_url: '',
        likes: 0,
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
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    handleChangeFood = (event) => {
        console.log(event.target.innerText)
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
        this.findingFood()
    }

    findingFood = () => {
        let allFoodCopy = this.props.allFood
        let foodObj = allFoodCopy.find(food => food.name === this.state.food)
        this.setState({
            food_id: foodObj.id,
            foodName: foodObj.name,
            food_image_url: foodObj.image,
        },() => this.postThePost())
    }

    postThePost = () => {
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                user_id: this.props.currentUser.id,
                food_id: this.state.food_id,
                foodName: this.state.foodName,
                username: this.props.currentUser.username,
                image_url: this.state.food_image_url,
                profile_image_url: this.props.currentUser.user_picture,
                text: this.state.opinion,
                likes: 0,
                dislikes: 0,
            })
        })
        .then(res => res.json())
        .then(data => {
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


    // incrementLike = (postId,likes) => {
    //     // event would be the button on the post which I can also pass in to change its data and then send it to the back
    //     //if the button is a like add one to lieks if dislike add one to dislike
    //     console.log('postid: ',postId)
    //     console.log('likes: ',likes)
    //     let newLikes = likes + 1

    //     this.setState({
    //         likes: newLikes
    //     },() => 
    //         {console.log(this.state.likes)}
    //         // {
    //         //     fetch(`http://localhost:3000/posts/${postId}`, {
    //         //         method: 'POST',
    //         //         headers: {
    //         //             'Content-Type': 'application/json',
    //         //             'Accept': 'application/json'
    //         //         },
    //         //         body: JSON.stringify({
    //         //             likes: this.state.likes
    //         //         })
    //         //     })
    //         //     .then(response => response.json())
    //         //     .then(data => {console.log(data)})
    //         // }
    //     )
    //     // {console.log('state likes : ',this.state.likes)}
        
    // }

    render(){

        return(
            <Container>
                <Segment>
                <h1>Forum</h1>
                    {this.props.allPosts ? 
                        this.props.allPosts.map(post => 
                            <Feed size='large'>
                            {/* {console.log(post)} */}
                                <Feed.Event>
                                <Feed.Label image={post.profile_image_url} />
                                    <Feed.Content>

                                        <Feed.Summary>
                                        <a>{post.username} on {post.foodName}</a>
                                        {/* <Feed.Date>3 days ago</Feed.Date> */}
                                        </Feed.Summary>

                                        <Feed.Extra images>
                                            <a>
                                                <img src={post.image_url} />
                                            </a>
                                        </Feed.Extra>

                                        <Feed.Extra text >
                                            {post.text}
                                        </Feed.Extra>

                                        <Feed.Meta>
                                            <Button as='div' labelPosition='right' onClick={() => alert("feature coming soon!")} value={post.likes}>
                                                <Button icon >
                                                    <Icon name='heart' />
                                                    Like
                                                </Button>
                                                <Label as='a' basic pointing='left'>
                                                    {this.state.likes === 0 ? post.likes : this.state.likes}
                                                </Label>
                                            </Button>

                                            <Button as='div' labelPosition='left'  onClick={() => alert("feature coming soon!")} >
                                                <Label as='a' basic pointing='right'>
                                                    {post.dislikes}
                                                </Label>
                                                <Button icon >
                                                    <Icon name='heart' />
                                                    Dislike
                                                </Button>
                                            </Button>
                                        </Feed.Meta>
                                        <Divider/>
                                    </Feed.Content>
                                    
                                </Feed.Event>        
                            </Feed>                 
                        )
                    :
                        null
                    }
                    {this.props.currentUser ? 
                        <Modal trigger={<Button>Write a Post</Button>} closeIcon >
                            <Modal.Header>How do you feel?</Modal.Header>
                            <Modal.Content >
                            <Header as='h3' color='blue'>{this.props.currentUser.username}</Header>
                            <Form onSubmit={(event) => this.handleSubmit(event)}>
                                <Form.Group widths='equal'>
                                {/* <Form.Field
                                    id='form-input-control-username'
                                    control={Input}
                                    label='Username'
                                    placeholder='username'
                                    name='username'
                                    value={this.state.username}
                                    onChange={this.handleChange}
                                    /> */}
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
                </Segment>
            </Container>
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