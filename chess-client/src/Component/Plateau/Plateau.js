import React from 'react';
import {Spring, animated} from 'react-spring';

import '../../Style/Plateau.css'
import Piece from './Piece';

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
        this.newMovePosition = null;
        this.newMovePositionStyle = null;

        this.state = {
            selectedPiece: null,
            possibleMoves: null,
            moving: false,
            renderingLastMove: false,
        }

        
    }

    static getDerivedStateFromProps(props, state){
        return {
            renderingLastMove: true,
        }
    }

    HandleEndMoveAnim(){

        if( this.state.renderingLastMove )

            this.setState({renderingLastMove : false});

        else if ( this.state.moving ) {
            
        }

    }

    handleClick(x, y){
        let table = this.props.status;


        //If we've clicked on a second on the selected piece
        if(this.state.selectedPiece && this.state.selectedPiece.x === x && this.state.selectedPiece.y === y)
        {
            this.setState({
                selectedPiece: null,
                possibleMoves: null
            });
        }

        //If we've clicked on a piece which is the same color as ours
        else if(table[y][x] !== 0 && table[y][x] * this.playerColor > 0)
        {
            
            this.setState({
                selectedPiece: {x , y},
                possibleMoves: this.findPossibleMoves(x, y, this.playerColor),
            });

        }
        
        //If we've selected a piece and clicked on a legit position to make a move
        else if ( this.state.selectedPiece && this.state.possibleMoves[y][x] == 1 )
        {
            this.newMovePosition = { x, y };
            this.newMovePositionStyle = {
                top: (y * 75) + 'px',
                left: (x * 75) + 'px',
            }
            this.setState({
                moving: true,
                possibleMoves: null
            })
        }
        else
        {   
            this.setState({
                selectedPiece: null,
                possibleMoves: null
            });
        
        }
        
    }


    //Generate the bottom grid layer 
    generateGrille(selectedPiece, possibleMoves){

        let grilleCaseElements = [];
        let black = true;

        for (let i = 0; i < 64 ; i++) 
        {
            //Is the tile black ?
            if (i % 8 != 0)
                black = !black;

            //We get our current coordinates
            let x = i % 8,
                y = Math.floor(i / 8);

            //If the current tile corresponds to a selectedPiece, or if it corresponds to a "movable" location
            let isPieceSelected = selectedPiece !== null && (selectedPiece.x === x && selectedPiece.y === y),
                isMovePossible = possibleMoves !== null && possibleMoves[y][x];

            let color = black ? '#769656' : '#eeeed2';

            grilleCaseElements.push(
                //The first spring corresponds to the selected piece
                <Spring
                    key={i+'caseGrille'}
                    backgroundColor={ isPieceSelected ? '#e2e25f' : color}
                >
                { styles => (
                    <animated.div 
                        
                        className={black ? 'blackTile': 'whiteTile'}
                        style={{...styles}}
                    >  
                    
                    <Spring  //The second spring corresponds to the "movable" location
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

    generatePieces(selectedPiece, moving, renderingLastMove){

        let grillePieceElements = [];

        let precMove = this.props.move.previousPieceInfo,
            newMove = this.props.move.newPieceInfo,
            precPiece = this.props.move.consumedPiece;


        for (let k = 0; k < 64 ; k++) 
        {
            let i = k % 8,
                j = Math.floor(k / 8);

            //If the tile isnt empty, nor has it been moved the previous turn
            if(this.props.status[i][j] !== 0)
            {   
                
                let isSelected = selectedPiece && (i === selectedPiece.y) && (j === selectedPiece.x),
                    beenMovedLastTurn = ( i === newMove.y && j === newMove.x),
                    isEaten = this.newMovePosition && (i === this.newMovePosition.y) && (j === this.newMovePosition.x);


                let positionStyle, newPositionStyle;
                if (beenMovedLastTurn)
                {
                    positionStyle = {
                        top: ( precMove.y * 75 ) + 'px',
                        left: ( precMove.x * 75 ) + 'px',                
                    };
                    newPositionStyle = {
                        top: ( newMove.y * 75 ) + 'px',
                        left: ( newMove.x * 75 ) + 'px',                            
                    }
                }
                else
                {
                    positionStyle = {
                        top: ( i * 75 ) + 'px',
                        left: ( j * 75 ) + 'px',            
                    };
                    newPositionStyle = this.newMovePositionStyle;                 
                }
                

                grillePieceElements.push(

                    <Piece 
                        pieceID={this.props.status[i][j]}
                        
                        translation={(moving && isSelected) || (renderingLastMove && beenMovedLastTurn)}
                        fadeIn={moving && isEaten}

                        position={positionStyle}
                        newPosition={newPositionStyle}

                        HandleEndMoveAnim={()=>this.HandleEndMoveAnim()}

                        key={k+'pieceGrille'}
                    />

                );
            }
            
        }



        
        if( precPiece !== PIECE.NULL && renderingLastMove)
            grillePieceElements.push(

                <Piece 
                    pieceID={precPiece}
                    
                    translation={false}
                    fadeIn={renderingLastMove}

                    position={{top: (newMove.y*75)+'px' , left: (newMove.x*75)+'px'}}
                    newPosition={{top: (newMove.y*75)+'px' +'', left: (newMove.x*75)+'px'+''}}

                    HandleEndMoveAnim={()=>this.HandleEndMoveAnim()}

                    key={99530+'pieceGrille'}
                />

            );

        return grillePieceElements;

    }

    generateClickLayer(){

        let grilleClickElements = [];

        for (let i = 0; i < 64 ; i++) 
        {
            let x = i % 8,
                y = Math.floor(i / 8);

            
            let isPlayersTile = this.props.status[y][x] * this.playerColor > 0,
                isMovePossible =  this.state.possibleMoves !== null && this.state.possibleMoves[y][x];

            grilleClickElements.push(
                <div 
                    key={i+'clickGrille'}
                    className={
                        (isMovePossible ? 'highLightedTile' : 'non-highLightedTile') + ' ' +
                        (isPlayersTile? 'playerTile' : 'adversaireTile') + ' ' + 
                        'clickableCase'
                    }


                    onClick={()=>this.handleClick(x, y)}
                >
                    
                </div>
            );

            
        }

        return grilleClickElements;
    }

    findPossibleMoves(x, y, tour){
        
        let table = toggleDirection(this.props.status, tour),
            possibleMoves = Array(8).fill(null).map(() => Array(8).fill(0));//Innit a 8x8 matrix (JS :/)


        y = (tour === COLOR.NOIR) ? y : 8-y-1;

        //PAWN
        //==============================================================
        if ( table[y][x] === PIECE.PION) 
        {
            let  pasclassique = false; // Si on peut fair un pas classique, on met cette variable a 1

            //CLASSICAL MOVE
            if ( table[y+1][x] === PIECE.NULL)
            {
                possibleMoves[y+1][x] = 1;
                pasclassique = true;
            }

            //FIRST MOVE
            if ( pasclassique && y === 1 )
            {

                if ( table[y+2][x] === PIECE.NULL )

                    possibleMoves[y+2][x] = 1;

            }

            //TAKING OPPONENT'S PIECE
            if ( y !== 7 ) 
            {
                if ( x !== 7 && table[y+1][x+1] * tour < 0)

                    possibleMoves[y+1][x+1] = 1;

                if ( x !== 0 && table[y+1][x-1] * tour < 0 )

                    possibleMoves[y+1][x-1] = 1;
            }

            console.log(possibleMoves);
        }

        return toggleDirection(possibleMoves, tour);
        
        function toggleDirection(table, tour){
            if( tour === COLOR.BLANC )
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

    render(){
        console.log(this.state.renderingLastMove);
        return(
            <div id='plateauCTN'>
                {this.generateGrille(this.state.selectedPiece, this.state.possibleMoves)}

                <div id='piecesCTN' onClick={(e)=>this.handleClick(e)}>
                    {this.generatePieces(this.state.selectedPiece, this.state.moving, this.state.renderingLastMove)}
                </div>

                <div id='clickLayer'>
                    {this.generateClickLayer()}
                </div>
            </div>
        );
    }
}

export default Plateau;