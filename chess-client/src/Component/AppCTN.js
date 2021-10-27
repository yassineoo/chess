import React, { Component } from 'react'
import Header from './Header';
import LoginPopup from './LoginPopup';
import MainMenu from './MainMenu';
import GameInterface from './GameInterface';



export default class AppCTN extends Component {

    constructor(props){
        super( props );

        this.state = {
            displayLoginPopUp: false,
        }

    }

    handleDisplayLogin(){
        this.setState({displayLoginPopUp : true});
    }
    handleHideLogin(){
        this.setState({displayLoginPopUp : false});
    }

    render() {
        return (
            <div style={{margin:'auto'}}>

                <Header 
                    handleDisplayLogin={this.handleDisplayLogin.bind(this)}
                />
                
                <center>
                    <MainMenu />
                    {/*<GameInterface color={1}/>*/}
                </center>

                {this.state.displayLoginPopUp && 
                    <LoginPopup
                        handleHideLogin={this.handleHideLogin.bind(this)}
                    />
                } 
    
          </div>
        )
    }
}
