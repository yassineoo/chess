import React from 'react';
import {Spring, animated} from 'react-spring';

import '../../Style/Plateau.css'

class Plateau extends React.Component{

    constructor(props){
        super(props);

        this.playerColor = 1;

        this.state = {
            selectedPiece: {},

        }
    }

    isMoveLegit(){
        return true;
    }

    handleClick(x, y){
        let table = this.props.status;

        //If we've clicked on a piece which is the same color as ours
        if(table[y][x] !== 0 && table[y][x] * this.playerColor > 0)
        {
            this.setState({
                selectedPiece: {x , y}
            });

        }
        else
        {   
            this.setState({
                selectedPiece: {}
            });
        
        }
        
    }

    generateGrille(selectedPiece){

        let grilleCaseElements = [];
        let black = true;

        for (let i = 0; i < 64 ; i++) 
        {

            if (i % 8 != 0)
                black = !black;

            let x = i % 8,
                y = Math.floor(i / 8);

            let color = black ? '#769656' : '#eeeed2';

            grilleCaseElements.push(
                <Spring
                    key={i+'caseGrille'}
                    backgroundColor={selectedPiece.x == x && selectedPiece.y == y ? '#e2e25f' : color}
                >
                { styles => (
                    <animated.div 
                        
                        className={black ? 'blackTile': 'whiteTile'}
                        style={{...styles}}
                    >
                        
                    </animated.div>
                )}
                </Spring>
                
            );

            
        }

        return grilleCaseElements;
    }

    generatePieces(){
        let grillePieceElements = [];

        for (let k = 0; k < 64 ; k++) 
        {
            let i = k % 8,
                j = Math.floor(k / 8);

            if(this.props.status[i][j] !== 0)
            {
                let position = {
                    top: ( i * 75 ) + 'px',
                    left: ( j * 75 ) + 'px',
                    cursor: (this.playerColor * this.props.status[i][j] > 0 ? 'pointer' : 'initial')
                }
    
                grillePieceElements.push(



                    <div 
                        key={k+'pieceGrille'}
                        className={'pieceElement'}
                        style={{...position}}
                    >
                        <img src={this.loadPieceUrl(this.props.status[i][j])}>
    
                        </img>
                    </div>



                );
            }
            
        }

        return grillePieceElements;
    }

    generateClickLayer(){
    
        let grilleClickElements = [];

        for (let i = 0; i < 64 ; i++) 
        {
            let x = i % 8,
                y = Math.floor(i / 8);

            
            let isPlayersTile = this.props.status[y][x] * this.playerColor > 0;

            grilleClickElements.push(
                <div 
                    key={i+'clickGrille'}
                    className="clickableCase"
                    className={isPlayersTile? 'playerTile' : 'adversaireTile'}

                    onClick={()=>this.handleClick(x, y)}
                >
                    
                </div>
            );

            
        }

        return grilleClickElements;
    }

    loadPieceUrl(pieceID){

        let url = '';
        let parentPath = '/Pieces/';

        let absValue = Math.abs(pieceID);

        switch (absValue) {
            case 1:
                url += 'pion';
                break;

            case 2:
                url += 'cavalier';
                break;

            case 3:
                url += 'tour';
                break;

            case 4:
                url += 'fou';
                break;

            case 5:
                url += 'roi';
                break;

            case 6:
                url += 'reine';
                break;

            default:
                break;
        }

        if(pieceID < 0)
            url += 'NOIR';

        else 
            url += 'BLANC';

        url += '.png';


        return parentPath + url;
    }

    render(){
        return(
            <div id='plateauCTN'>
                {this.generateGrille(this.state.selectedPiece)}

                <div id='piecesCTN' onClick={(e)=>this.handleClick(e)}>
                    {this.generatePieces()}
                </div>

                <div id='clickLayer'>
                    {this.generateClickLayer()}
                </div>
            </div>
        );
    }
}

export default Plateau;