import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react';
import { connect } from 'react-redux'


class FavoriteCard extends React.Component{

    postDelete = (object) => {
        //fettch post here
        console.log("delete object: ", object)

        fetch(`http://localhost:3000/favorites/${object.id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({food_id: object.food})
        })
        .then(res => res.json())
        .then( data => {this.deleteMealFromFavorites(data)})
    }

    deleteMealFromFavorites = (favorite) =>{
        const copyFavoritesArray = [...this.props.favorites]
        let index = copyFavoritesArray.findIndex(fav => fav.id === favorite.id)
        
        copyFavoritesArray.splice(index,1)
        
        // debugger
        this.props.deleteFavorite(copyFavoritesArray)

    }

    alert = () => {
        alert('feature coming soon! be patient! gr')
    }
    render(){
        return(
                <Card>
                    {/* {console.log(this.props)} */}
                    <Card.Header as='h3' textAlign='center' >{this.props.name}</Card.Header>
                    <Image src={this.props.image}/>
                    <Card.Content>
                        <Card.Meta>{this.props.categories}</Card.Meta>
                        <Card.Meta>{this.props.area}</Card.Meta>
                        {/* <Card.Description>{this.props.instructions}</Card.Description> */}
                        {/* conditionally render? based on either the click render a modal that pops open showing the instructions  */}
                    </Card.Content>
                    <Card.Content extra>
                        {/* <Button disable basic color='white' fluid onClick={this.props.deleteFavorite}> */}
                        <Button fluid basic color='white' disable onClick={this.alert}>
                            Show More
                        </Button><br/>
                        <Button basic color='red' fluid onClick={() => this.postDelete(this.props)}>
                            Delete
                        </Button>
                    </Card.Content>
                </Card>
        )
    }
}

function mapStateToProps(state){
    return {
      favorites: state.favorites,
    }
}
  
function mapDispatchToProps(dispatch){
    //edit states
    return {
        deleteFavorite: (favorites) => {
            // debugger
            dispatch({type: "DELETE_FAVORITE", payload: favorites})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FavoriteCard)