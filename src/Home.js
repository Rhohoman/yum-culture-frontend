import React from 'react';
import MealCard from './MealCard';
import { Card, Container, Divider, Button, Grid } from 'semantic-ui-react';
import { connect } from 'react-redux';

class Home extends React.Component{

    state = {
        filterValue: '',
        browseButton: false,
    }


    handleClick = (event) => {
        // console.log(event.target.value)
        this.setState({
            filterValue: event.target.value
        })
    }

    handleClickBrowse = () => {
        this.setState({
            browseButton: !this.state.browseButton
        })
    }

    render(){
        // console.log(this.props.allFood.map(food => food.categories))
        // console.log(this.props.allFood.filter(food => food.categories.includes('Beef')))
        return(
            <div>
                <div className='home' >
                    <h1>Welcome to Food Culture</h1>
                </div>

                <div className='loggedInName'>{this.props.currentUser ? <h1>{this.props.currentUser.username}</h1> : null} </div>

                <Container textAlign='justified'>
                    <Divider />
                    <br/>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                        consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
                        pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                        Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
                        ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                        nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                        augue. Curabitur ullamcorper ultricies nisi.
                    </p><br/>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                        consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
                        pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                        Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
                        ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                        nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                        augue. Curabitur ullamcorper ultricies nisi.
                    </p><br/>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                        consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
                        pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                        Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
                        ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                        nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                        augue. Curabitur ullamcorper ultricies nisi.
                    </p><br/>
                    <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
                        Aenean massa strong. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur
                        ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla
                        consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
                        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu
                        pede link mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi.
                        Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend
                        ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra
                        nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                        augue. Curabitur ullamcorper ultricies nisi.
                    </p><br/>
                </Container>

                <div className='button-group'>
                    <Container>
                        <Button fluid onClick={this.handleClickBrowse}>{this.state.browseButton ? 'Close Browsing': 'Browse Food Options'}</Button>
                    </Container>
                </div>

                {this.state.browseButton ? 

                <div>
                    <div className='home'>
                        <h3>View Foods</h3>
                    </div>
                    <div className='button-group'>
                        <Container>
                            <Button.Group fluid >
                                <Button onClick={this.handleClick} name='All' value='All'>All</Button>
                                <Button onClick={this.handleClick} name='Beef' value='Beef'>Beef</Button>
                                <Button onClick={this.handleClick} name='Chicken' value='Chicken'>Chicken</Button>
                                <Button onClick={this.handleClick} name='Lamb' value='Lamb'>Lamb</Button>
                                <Button onClick={this.handleClick} name='Miscellaneous' value='Miscellaneous'>Miscellaneous</Button>
                                <Button onClick={this.handleClick} name='Pasta' value='Pasta'>Pasta</Button>
                                <Button onClick={this.handleClick} name='Pork' value='Pork'>Pork</Button>
                                <Button onClick={this.handleClick} name='Seafood' value='Seafood'>Seafood</Button>
                                <Button onClick={this.handleClick} name='Side' value='Side'>Side</Button>
                                <Button onClick={this.handleClick} name='Starter' value='Starter'>Starter</Button>
                                <Button onClick={this.handleClick} name='Vegan' value='Vegan'>Vegan</Button>
                                <Button onClick={this.handleClick} name='Vegetarian' value='Vegetarian'>Vegetarian</Button>
                            </Button.Group>
                        </Container>
                    </div>
                    <div className='meal-cards'>
                        <Grid >
                            <Card.Group>
                                {this.state.filterValue === 'All' ? this.props.allFood.map( meal => <MealCard key={meal.id} {...meal}/>) : this.props.allFood.filter(food => food.categories.includes(this.state.filterValue)).map( meal => <MealCard key={meal.id} {...meal}/>)}
                            </Card.Group>
                        </Grid>
                    </div>
                </div>

                : null}
            </div>
        )
    }
}

function mapStateToProps(state){
    // get state
    return {
        allFood: state.allFood,
        currentUser: state.currentUser,
    }
}


export default connect(mapStateToProps)(Home)



                {/* <Grid relaxed columns={8}>
                        {this.props.allFood.map( meal => <MealCard key={meal.id} {...meal}/>)}
                </Grid> */}