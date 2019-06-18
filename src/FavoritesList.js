import React from 'react'
import FavoriteCard from './FavoriteCard'
import { Grid, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';


class FavoritesList extends React.Component{
    render(){
        // console.log(this.props.favorites)
        const favoritesArray = this.props.favorites
        return(
            <div>
                <div className='title'>
                    <h1>Your Favorite Meals</h1>
                </div>
                <Grid>
                    <Card.Group >
                        {favoritesArray.map( favoriteMeal => <FavoriteCard handleDelete={this.handleDelte} key={favoriteMeal.id} {...favoriteMeal} />)}
                    </Card.Group>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps(state){
    // get state
    return {
      favorites: state.favorites,
    }
}
  

export default connect(mapStateToProps)(FavoritesList)