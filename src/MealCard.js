import React from 'react'
import { Card, Image, Rating, Popup  } from 'semantic-ui-react';

class MealCard extends React.Component{

    generateRandomRating = () => {
        let randomInteger = 1 + (Math.random()*(4))
        return randomInteger
    }
    render(){
        return(
            <Popup
            trigger={
                <Card>
                    <Image src={this.props.image}/>
                    <Card.Header as='h3' textAlign='center' >{this.props.name}</Card.Header>
                    <Card.Content>
                        <Card.Meta>{this.props.categories}</Card.Meta>
                        <Card.Meta>{this.props.area}</Card.Meta>
                        {/* <Card.Description>{this.props.instructions}</Card.Description> */}
                        {/* conditionally render? based on either the click render a modal that pops open showing the instructions  */}
                    </Card.Content>
                </Card>
            }
            >
                <Popup.Header>User Rating</Popup.Header>
                <Popup.Content>
                <Rating icon='star' defaultRating={this.generateRandomRating()} maxRating={4} />
                </Popup.Content>
            </Popup>
        )
    }
}

export default MealCard