import React from 'react'
import { Card, Image, Button} from 'semantic-ui-react';
import { connect } from 'react-redux'


class FavoriteCard extends React.Component{

    render(){
        return(
            <Card>
                <Card.Header as='h3' textAlign='center' >{this.props.name}</Card.Header>
                <Image src={this.props.image}/>
                <Card.Content>
                    <Card.Meta>{this.props.categories}</Card.Meta>
                    <Card.Meta>{this.props.area}</Card.Meta>
                    {/* <Card.Description>{this.props.instructions}</Card.Description> */}
                    {/* conditionally render? based on either the click render a modal that pops open showing the instructions  */}
                </Card.Content>
                <Card.Content extra>
                    <Button basic color='white' fluid onClick={this.props.deleteFavorite}>
                        Show More
                    </Button><br/>
                    <Button basic color='red' fluid onClick={this.props.deleteFavorite}>
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
        deleteFavorite: (favorite) => {
            // debugger
            dispatch({type: "DELETE_FAVORITE", payload: favorite})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(FavoriteCard)