import React from 'react'
import { Dropdown } from 'semantic-ui-react'
import FavoritesList from './FavoritesList';
import { connect } from 'react-redux';
import Loader from './Loader';


class User extends React.Component{

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

    deleteMealFromFavorites = (favorite) =>{
        const copyFavoritesArray = [...this.props.favorites]
        let index = copyFavoritesArray.indexOf(favorite)
        copyFavoritesArray.splice(index, 1)

        this.props.deleteFavorite(copyFavoritesArray)

    }

    render(){
        // console.log(this.props.user)
        // console.log(this.state.user ? this.state.user.favorites : null)
        return(
            <div>
                {this.props.user ? 
                    <div>
                        <div>
                            <h1>User Display page</h1>
                            {this.props.user ? <img src={this.props.user.user_picture}/> : null}
                            {this.props.user ? <p>Name: {this.props.user.name}</p> : null}
                            {this.props.user ? <p>Location: {this.props.user.location}</p> : null}
                            {this.props.user ? <p>Username: {this.props.user.username}</p> : null}
                        </div>
                        <div>  
                            <div className='title'>
                                <h2>Add to Favorites</h2>
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
                        </div>
                        {this.props.favorites.length === 0 ? null : <FavoritesList favorites={this.props.favorites} />}
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
        deleteFavorite: (favorites) => {
            dispatch({type: "DELETE_FAVORITE", payload: favorites})
        },
        setDropdownOptions: (foods) => {
            dispatch({type: "DROPDOWN_ARRAY", payload: foods})
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(User) 