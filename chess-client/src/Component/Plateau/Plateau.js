import React from 'react';
import '../../Style/Plateau.css'

class Plateau extends React.Component{

    constructor(props){
        super(props)
    }

    generateGrille(){
        let grilleCaseElements = [];
        let black = true;

        for (let i = 0; i < 64 ; i++) 
        {
            if (i % 8 != 0)
                black = !black;

            grilleCaseElements.push(
                <div 
                    key={i}
                    className={black ? 'blackTile': 'whiteTile'}
                >
                    
                </div>
            );

            
        }

        return grilleCaseElements;
    }

    render(){
        return(
            <div id='plateauCTN'>
                {this.generateGrille()}
            </div>
        );
    }
}

export default Plateau;