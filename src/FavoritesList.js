import React from 'react'
import FavoriteCard from './FavoriteCard'
import { Grid, Card, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';


class FavoritesList extends React.Component{
    render(){
        // console.log(this.props.favorites)
        const favoritesArray = this.props.favorites
        return(
            <Container>
                <div className='title'>
                    <h2>Preferences</h2>
                </div>
                <Grid>
                    <Card.Group itemsPerRow={4}>
                        {favoritesArray.map( favoriteMeal => <FavoriteCard key={favoriteMeal.id} {...favoriteMeal} />)}
                    </Card.Group>
                </Grid>
            </Container>
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