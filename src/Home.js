import React from 'react';
import MealCard from './MealCard';
import { Card } from 'semantic-ui-react';

class Home extends React.Component{

    render(){
        console.log(this.props.allFood)
        return(
            <div>
                <div className='home' >
                    <h1>This is Home</h1>
                </div>

                <Card.Group itemsPerRow={4}>
                    {this.props.allFood.map( meal => <MealCard key={meal.id} {...meal}/>)}
                </Card.Group>
            </div>
        )
    }
}

export default Home