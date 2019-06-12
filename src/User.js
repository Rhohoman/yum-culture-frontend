import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import FavoritesList from './FavoritesList';

class User extends React.Component{

    state = {
        user: null,
        favorites: [],
        selectedFood: null,
    }

    componentDidMount(){
        const userId = this.props.match.params.id
        fetch(`http://localhost:3000/users/${userId}`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                user: response,
                favorites: response.favorites
            },() => console.log(this.state.favorites))
        })
    }

    // fetchFavorites = () => {
    //     fetch(`http://localhost:3000/favorites`)
    // }

    changeKeyForSearch = () => {
        const copyArrayFood = this.props.allFood
        const fixedArray = copyArrayFood.map( food => {
            food["text"] = food["name"]
            return food 
        } )

        return fixedArray
    }

    handleChange = (e) => {
        const selectedFoodID = e.target.id
        fetch(`http://localhost:3000/foods/${selectedFoodID}`)
        .then(response => response.json())
        .then(response => {
            this.setState({
                selectedFood: response
            },() => this.addingMealToFavorites(this.state.selectedFood))
        })
    }
    
    addingMealToFavorites = (meal) => {
        const copyFavoritesArray = this.state.favorites
        copyFavoritesArray.push(meal)

        this.setState({
            favorites: copyFavoritesArray
        },() => this.postFavorites())
    }
    //does this work here how I want it to work?
    // console.log(this.state.favorites)

    postFavorites = () => {
        fetch(`http://localhost:3000/favorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ 
                user_id: this.state.user.id,
                food_id: this.state.selectedFood.id,
                name: this.state.selectedFood.name,
                image: this.state.selectedFood.image,
                categories: this.state.selectedFood.youtube_url,
                area: this.state.selectedFood.area,
                instructions: this.state.selectedFood.instructions
            })
        })
    }

    render(){
        // console.log(this.props.allFood)
        // console.log(this.state.user ? this.state.user.favorites : null)
        return(
            <div>
                <div>
                    <h1>User Display page</h1>
                    {this.state.user ? <p>Name: {this.state.user.name}</p> : null}
                    {this.state.user ? <p>Location: {this.state.user.location}</p> : null}
                    {this.state.user ? <p>Username: {this.state.user.username}</p> : null}
                </div>
                <div>
                    <h2>Add to Favorites</h2>
                    <Dropdown
                    onChange={this.handleChange}
                    placeholder='Select an option to add'
                    fluid
                    search
                    selection
                    value={this.state.selectedFood ? this.state.selectedFood.name : ''}
                    selectOnNavigation={false}
                    options={this.changeKeyForSearch()}
                    />
                </div>
                {this.state.favorites.length === 0 ? null : <FavoritesList favorites={this.state.favorites} />}
            </div>
        )
    }
}

export default User 