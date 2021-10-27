import React, { Component } from 'react'

import '../Style/font/font.css'
import '../Style/Header.css'

export class Header extends Component {

    constructor(props){
        super(props);


    }

    render() {
        return (
            <div id="headerCTN">
                
                <button 
                    id='connextion-HEADER'
                    onClick={this.props.handleDisplayLogin}
                >
                    الإتصال
                </button>

                <h2 id='title-HEADER'>
                    سَطرانجا  
                </h2>


                
            </div>
        )
    }
}


export default Header;
