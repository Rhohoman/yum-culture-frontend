import React from 'react'
import MealCard from './MealCard'

class FavoritesList extends React.Component{
    render(){
        const favoritesArray = this.props.favorites
        return(
            <div>
                <h1>Your Favorite Meals</h1>
                {favoritesArray.map( favoriteMeal => <MealCard {...favoriteMeal} />)}
            </div>
        )
    }
}

export default FavoritesList