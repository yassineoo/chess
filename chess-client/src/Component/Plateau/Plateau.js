import React from 'react';
import {Spring, animated} from 'react-spring';

import '../../Style/Plateau.css'
import Piece from './Piece';

const PIECE = {
    NULL: 0,
    PION: 1,
    CAVALIER: 2,
    TOUR: 3,
    FOU: 4,
    ROI: 5,
    REINE: 6
}

const COLOR = {
    BLANC: 1,
    NOIR: -1
}

class Plateau extends React.Component{

    constructor(props){

        console.log('neu');
        super(props);

        this.playerColor = props.color;
        this.newMovePosition = null;
        this.newMovePositionStyle = null;


        this.state = {
            selectedPiece: null,
            possibleMoves: null,
            moving: false,
            renderingLastMove: true,

            turn: -1,
            clickable: props.clickable,
        }

        
    }

    componentDidUpdate(){

    }

    static getDerivedStateFromProps(props, state){
        if (state.turn !== props.turn)

        console.log("new Turn");
        if (state.turn !== props.turn)
        
            return {
                renderingLastMove: true,
                selectedPiece: null,
                possibleMoves: null,
                moving: false,
                renderingLastMove: true,

                clickable: props.clickable,

                turn: props.turn,
            }
        else 
            return {};
    }

    HandleEndMoveAnim(moveType){
        //moveType(boolean): either the end of the fadeIn or translation animation

        if(!moveType)
            return;

        
        if( this.state.renderingLastMove ){

            this.setState({renderingLastMove : false});

        }

        else if ( this.state.moving ) 
        {
            let altMovePosition = {
                y: this.state.selectedPiece.y,
                x: this.state.selectedPiece.x
            };
            
            this.props.handleComfirmMove(altMovePosition, this.newMovePosition)
        }

    }

    handleClick(x, y, clickable){

        if(!clickable)
            return;

        if(this.state.moving)
            return;


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
                possibleMoves: Plateau.findPossibleMoves(x, y, this.playerColor, this.props.status),
            });

        }
        
        //If we've selected a piece and clicked on a legit position to make a move
        else if ( this.state.selectedPiece && this.state.possibleMoves[y][x] === 1 )
        {
            let altMovePosition = {
                y: this.state.selectedPiece.y,
                x: this.state.selectedPiece.x
            };

            this.newMovePosition = { x, y };
            this.newMovePositionStyle = {
                top: (y * 75) + 'px',
                left: (x * 75) + 'px',
            }
            this.setState({
                moving: true,
                possibleMoves: null,
                clickable: false,
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

        let tableCaseElements = [];
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

            tableCaseElements.push(
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

        return tableCaseElements;
    }

    generatePieces(selectedPiece, moving, renderingLastMove){

        let tablePieceElements = [];

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
                if (beenMovedLastTurn && renderingLastMove)
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
                

                tablePieceElements.push(

                    <Piece 
                        pieceID={this.props.status[i][j]}
                        
                        translation={(moving && isSelected) || (renderingLastMove && beenMovedLastTurn)}
                        fadeIn={moving && isEaten}

                        position={positionStyle}
                        newPosition={newPositionStyle}

                        HandleEndMoveAnim={(moveType)=>this.HandleEndMoveAnim(moveType)}

                        key={k+'pieceGrille' + renderingLastMove}
                    />

                );
            }
            
        }



        
        if( precPiece !== PIECE.NULL && renderingLastMove)
            tablePieceElements.push(

                <Piece 
                    pieceID={precPiece}
                    
                    translation={false}
                    fadeIn={renderingLastMove}

                    position={{top: (newMove.y*75)+'px' , left: (newMove.x*75)+'px'}}
                    newPosition={{top: (newMove.y*75)+'px' +'', left: (newMove.x*75)+'px'+''}}

                    HandleEndMoveAnim={(moveType)=>this.HandleEndMoveAnim(moveType)}

                    key={99530+'pieceGrille'}
                />

            );

        return tablePieceElements;

    }

    generateClickLayer(clickable){

        let tableClickElements = [];

        for (let i = 0; i < 64 ; i++) 
        {
            let x = i % 8,
                y = Math.floor(i / 8);

            
            let isPlayersTile = this.props.status[y][x] * this.playerColor > 0,
                isMovePossible =  this.state.possibleMoves !== null && this.state.possibleMoves[y][x];

            tableClickElements.push(
                <div 
                    key={i+'clickGrille'}
                    className={
                        (isMovePossible ? 'highLightedTile' : 'non-highLightedTile') + ' ' +
                        (isPlayersTile? 'playerTile' : 'adversaireTile') + ' ' + 
                        'clickableCase'
                    }


                    onClick={()=>this.handleClick(x, y, clickable)}
                >
                    
                </div>
            );

            
        }

        return tableClickElements;
    }

    static findPossibleMoves(x, y, tour, status){
        
        let table = toggleDirection(status, tour),
            possibleMovesList = [], // TODO ::
            possibleMoves = Array(8).fill(null).map(() => Array(8).fill(0));//Innit a 8x8 matrix (JS :/)


        y = (tour === COLOR.NOIR) ? y : 8-y-1;

        //PAWN
        //==============================================================
        if ( Math.abs(table[y][x]) === PIECE.PION) 
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

        }
          //ROOK OR QUEEN
        //==============================================================
        if ( Math.abs(table[y][x]) === PIECE.TOUR || Math.abs(table[y][x]) === PIECE.REINE) 
        {
            let i = 1;

            while ( y+i < 8 && table[y+i][x] * tour <= 0) 
            {
                possibleMoves[y+i][x] = 1;

                if (table[y+i][x] * tour < 0)

                    break;

                i++;
            }

            i = 1;
            while (  y-i >= 0 && table[y-i][x] * tour <= 0) 
            {
                possibleMoves[y-i][x] = 1;

                if (table[y-i][x] * tour < 0)

                    break;
                i++;
            }

            i = 1;
            while ( x+i < 8 && table[y][x+i] * tour <= 0) 
            {
                possibleMoves[y][x+i] = 1;

                if (table[y][x+i] * tour < 0)

                    break;

                i++;
            }

            i = 1;
            while ( x-i >= 0 && table[y][x-i] * tour <= 0  ) 
            {
                possibleMoves[y][x-i] = 1;

                if (table[y][x-i] * tour < 0)

                    break;
                i++;
            }
        }
        //BISHOP OR QUEEN
        //==============================================================
        if ( Math.abs(table[y][x]) === PIECE.FOU || Math.abs(table[y][x]) === PIECE.REINE) 
        {
            let i = 1;

            while ( y+i < 8  &&  x+i < 8 && table[y+i][x+i] * tour <= 0 ) 
            {
                possibleMoves[y+i][x+i] = 1;
                
                if (table[y+i][x+i] * tour < 0 )

                    break;

                i++;
            }

            i = 1;
            while ( y-i >= 0  &&  x+i < 8 && table[y-i][x+i] * tour <= 0  ) 
            {
                possibleMoves[y-i][x+i] = 1;
                
                if (table[y-i][x+i] * tour < 0 )
                
                    break;
                i++;
            }

            i = 1;
            while ( y+i < 8  &&  x-i >= 0 && table[y+i][x-i] * tour <= 0) 
            {
                possibleMoves[y+i][x-i] = 1;

                if (table[y+i][x-i] * tour < 0)

                    break;
                i++;
            }

            i = 1;
            while ( y-i >= 0  &&  x-i >= 0 && table[y-i][x-i] * tour <= 0 ) 
            {
                possibleMoves[y-i][x-i] = 1;

                if (table[y-i][x-i] * tour < 0)

                    break;
                i++;
            }
        }
        //KNIGHT
        //==============================================================
        else if ( Math.abs(table[y][x]) === PIECE.CAVALIER)
        {

                // ONE FORWARD LEFT DIAGONAL STEP AND ANOTHER STEP TO THE LEFT
                if ((x > 0 && y > 1) && (table[y-2][x-1] * tour <= 0) )
                    possibleMoves[y-2][x-1] = 1;

                // ONE FORWARD RIGHT DIAGONAL STEP AND ANOTHER STEP TO THE RIGHT
                if ((x > 0 && y < 6) && (table[y+2][x-1] * tour <= 0) )
                    possibleMoves[y+2][x-1] = 1;

                // ONE BACKWARD LEFT DIAGONAL STEP AND ANOTHER ONE TO THE LEFT
                if ((x < 7 && y > 1) && (table[y-2][x+1] * tour <= 0) )
                    possibleMoves[y-2][x+1] = 1;

                // ONE BACKWARD RIGHT DIAGONAL STEP AND ANOTHER STEP TO THE RIGHT
                if ((x < 7 && y < 6) && (table[y+2][x+1] * tour <= 0) )
                    possibleMoves[y+2][x+1] = 1;

                // ONE FORWARD LEFT DIAGONAL STEP AND ANOTHER FORWARD ONE
                if ((x > 1 && y > 0) && (table[y-1][x-2] * tour <= 0) )
                    possibleMoves[y-1][x-2] = 1;

                // ONE FORWARD RIGHT DIAGONAL STEP AND ANOTHER FORWARD ONE
                if ((x > 1 && y < 7) && (table[y+1][x-2] * tour <= 0) )
                    possibleMoves[y+1][x-2] = 1;

                // ONE BACKWARD DIAGONAL LEFT MOVE AND ANOTHER FORWARD MOVE
                if ((x < 6 && y > 0  && (table[y-1][x+2] * tour <= 0) ))
                    possibleMoves[y-1][x+2] = 1;

                // ONE BACKWARD DIAGONAL RIGHT MOVE AND ANOTHER BACKWARD ONE
                if ((x < 6 && y < 7) && (table[y+1][x+2] * tour <= 0) )
                    possibleMoves[y+1][x+2] = 1;

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
        console.log('updage', this.state);
        return(

            <div id='plateauCTN'>

                {this.generateGrille(this.state.selectedPiece, this.state.possibleMoves)}

                <div id='piecesCTN'>
                    {this.generatePieces(this.state.selectedPiece, this.state.moving, this.state.renderingLastMove)}
                </div>

                <div id='clickLayer'>
                    {this.generateClickLayer(this.state.clickable)}
                </div>

            </div>
        );
    }
}

export default Plateau;