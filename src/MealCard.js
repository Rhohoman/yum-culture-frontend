import React from 'react'
import { Card, Image, Grid } from 'semantic-ui-react';

class MealCard extends React.Component{
    render(){
        return(
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
        )
    }
}

export default MealCard