import React from 'react';
import {Spring, animated} from 'react-spring';

import '../../Style/Plateau.css'

const PIECE = {
    NULL: 0,
    PION: 1,
}

const COLOR = {
    BLANC: 1,
    NOIR: -1
}

class Plateau extends React.Component{

    constructor(props){
        super(props);

        this.playerColor = 1;

        this.state = {
            selectedPiece: null,
            possibleMoves: null,
        }

        
    }

    isMoveLegit(){
        return true;
    }

    findPossibleMoves(x, y, tour){
        
        let table = toggleDirection(this.props.status, tour),
            possibleMoves = Array(8).fill(null).map(() => Array(8).fill(0));//Innit a 8x8 matrix (JS :/)


        y = (tour == COLOR.NOIR) ? y : 8-y-1;

        //PAWN
        //==============================================================
        if ( table[y][x] == PIECE.PION) 
        {
            let  pasclassique = false; // Si on peut fair un pas classique, on met cette variable a 1

            //CLASSICAL MOVE
            if ( table[y+1][x] === PIECE.NULL)
            {
                possibleMoves[y+1][x] = 1;
                pasclassique = true;
            }

            //FIRST MOVE
            if ( pasclassique && y == 1 )
            {

                if ( table[y+2][x] == PIECE.NULL )

                    possibleMoves[y+2][x] = 1;

            }

            //TAKING OPPONENT'S PIECE
            if ( y != 0 ) 
            {
                if ( x != 7 && table[y-1][x+1] * tour < 1)

                    possibleMoves[y-1][x+1] = 1;

                if ( x != 0 && table[y-1][x-1] * tour < 1 )

                    possibleMoves[y-1][x-1] = 1;
            }

        }

        return toggleDirection(possibleMoves, tour);
        
        function toggleDirection(table, tour){
            if( tour == COLOR.BLANC )
            {
                let newTable = new Array(8);

                for (let i = 0; i < 8; i++) 
                    newTable[i] = [...table[8-i-1]];

                return newTable;
            }
            else
                return table;

        }
    }

    handleClick(x, y){
        let table = this.props.status;

        //If we've clicked on a piece which is the same color as ours
        if(table[y][x] !== 0 && table[y][x] * this.playerColor > 0)
        {
            
            this.setState({
                selectedPiece: {x , y},
                possibleMoves: this.findPossibleMoves(x, y, this.playerColor),
            });

        }
        else
        {   
            this.setState({
                selectedPiece: null,
                possibleMoves: null
            });
        
        }
        
    }

    generateGrille(selectedPiece, possibleMoves){

        let grilleCaseElements = [];
        let black = true;

        for (let i = 0; i < 64 ; i++) 
        {

            if (i % 8 != 0)
                black = !black;

            let x = i % 8,
                y = Math.floor(i / 8);

            let isPieceSelected = selectedPiece !== null && (selectedPiece.x === x && selectedPiece.y === y),
                isMovePossible = possibleMoves !== null && possibleMoves[y][x];

            let color = black ? '#769656' : '#eeeed2';

            grilleCaseElements.push(
                <Spring
                    key={i+'caseGrille'}
                    backgroundColor={ isPieceSelected ? '#e2e25f' : color}

                >
                { styles => (
                    <animated.div 
                        
                        className={black ? 'blackTile': 'whiteTile'}
                        style={{...styles}}
                    >
                    
                    <Spring
                        opacity={ isMovePossible ? '1' : '0'}
                    >
                    { styles => (
                        <animated.div                             
                            style={{...styles}}
                            className="possibleMoveIcon" 
                        >
                        </animated.div>
                    )}
                    </Spring>
                    
                        
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
        let parentPath = '/Pieces/svgCommon/';

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

        url += '.svg';


        return parentPath + url;
    }

    render(){
        return(
            <div id='plateauCTN'>
                {this.generateGrille(this.state.selectedPiece, this.state.possibleMoves)}

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