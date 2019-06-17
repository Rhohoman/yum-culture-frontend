import React from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Embed } from 'semantic-ui-react'

class Explore extends React.Component{

    componentDidMount(){
        fetch('http://localhost:3000/largest_hash_key')
        .then(response => response.json())
        .then(mostFav => {
            this.getMeal(mostFav)
        })
    }

    getMeal = (mostFavHalf) => {
        let foodArray = this.props.allFood
        // debugger
        let meal = foodArray.find( meal => meal.name === mostFavHalf[0])
        this.props.setMostFavorite(meal)
    }

    // youtubeLinkSlice = () => {
    //     const youtube_link = this.props.mostFavorited.youtube_url
    //     const id = youtube_link.slice(32,43)
    //     const source = youtube_link.slice(12,19)

    //     if(youtube_link){

    //     }
    // }

    render(){
        // const allFoodArray = this.props.allFood

        // console.log(this.props.mostFavorited.youtube_url)
        const youtube_link = this.props.mostFavorited.youtube_url
        const youtube_id = youtube_link ? youtube_link.slice(32,43) : null
        const youtube_source = youtube_link ? youtube_link.slice(12,19) : null

        // debugger
        const randomItem = this.props.allFood[Math.floor(Math.random()*this.props.allFood.length)]
        console.log(randomItem.youtube_url)
        // const randomItem_youtube_link = randomItem ? randomItem.youtube_url : null
        // const randomItem_youtube_link_id = randomItem_youtube_link !== null ? randomItem.youtube_link.slice(32,43) : null
        // const randomItem_youtube_link_source = randomItem_youtube_link ? randomItem.youtube_link.slice(12,19) : null

        return(
            <div>
                <h1>Explore</h1>

                <h3>This week's most favorited food is...</h3>
                {this.props.mostFavorited.name} <br />
                <img src={this.props.mostFavorited.image} alt='IMAGE' width="250" height="300" /> <br/>

                <Modal trigger={<Button>Show Instructions</Button>}>
                    <Modal.Header>{this.props.mostFavorited.name}</Modal.Header>
                    <Modal.Content >
                    <Embed wrapped size='medium' id={youtube_id} source={youtube_source}/>
                    <Modal.Description>
                        <Header>Instructions</Header>
                        <p>{this.props.mostFavorited.instructions}</p>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>

                <h1>Random Food</h1>
                {randomItem ? randomItem.name : null} <br />
                <img src={randomItem ? randomItem.image : null} alt='IMAGE' width="250" height="300" /> <br/>

                <Modal trigger={<Button>Show Instructions</Button>}>
                    <Modal.Header>{randomItem.name}</Modal.Header>
                    <Modal.Content >
                    <Embed wrapped size='medium' id={youtube_id} source={youtube_source}/>
                    <Modal.Description>
                        <Header>Instructions</Header>
                        <p>{randomItem.instructions}</p>
                    </Modal.Description>
                    </Modal.Content>
                </Modal>

            </div>
        )
    }
}

function mapStateToProps(state){
    // get state
    return {
        allFood: state.allFood,
        mostFavorited: state.mostFavorited,
    }
}


function mapDispatchToProps(dispatch){
    //edit states
    return {
      setMostFavorite: (meal) => {
          dispatch({type: "SET_MOST_FAVORITE_MEAL", payload:meal})
      },
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(Explore)