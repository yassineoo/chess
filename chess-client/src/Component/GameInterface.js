import React, { Component } from 'react'
import Plateau from './Plateau/Plateau'

import PlayerIA from '../Class/IA'

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
/*            [-0, -2, -4, -5, -6, -0, -0, -3],
            [0, 0, -0, -0, -0, -1, -1, -1],
            [0, -1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, -1, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [3, 2, 4, 6, 5, 4, 2, 3],*/
export default class RoomManager extends Component {

    constructor(props){
        super(props);
        


        this.color = props.color;
        this.status = [
            [-0, -0, -0, -5, -6, -0, -0, -0],
            [0, 0, -0, -0, -0, -0, -0, -0],
            [0, -1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, -0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 1, 1, 1],
            [3, 2, 4, 6, 5, 4, 2, 3],
        ];



        this.state = {
            turn: 0,
            status: this.copyTable(this.status),
            move: {
                previousPieceInfo:{
                  x: 1,
                  y: 1,
                },
                newPieceInfo:{
                  x: 1,
                  y: 2,
                },
                consumedPiece: PIECE.PION
            },
            playing: props.color === COLOR.BLANC ? true : false,
        }

        this.opponentType = 'IA';
        this.ia = new PlayerIA(this.status, -this.color);

    }

    letIAChoose(){

        let iaMove = this.ia.getIAMove();

        
        this.status[iaMove.newPieceInfo.y][iaMove.newPieceInfo.x] = 
                    this.status[iaMove.previousPieceInfo.y][iaMove.previousPieceInfo.x];
        this.status[iaMove.previousPieceInfo.y][iaMove.previousPieceInfo.x] = PIECE.NULL;



        this.setState({
            turn: this.state.turn + 1,
            move: {...iaMove},
            status: this.copyTable(this.status),
        });

        console.log(iaMove, this.status);

        this.ia.setIAStatus( this.copyTable(this.status) );


    }

    comfirmMove(altCoord, newCoord){


        this.status[newCoord.y][newCoord.x] = this.status[altCoord.y][altCoord.x];
        this.status[altCoord.y][altCoord.x] = PIECE.NULL;



        if( this.opponentType === "IA" )
        {
            this.letIAChoose();
        }
        else
        {

        }
    }

    copyTable(table){
        let newTable = new Array(8);

        for (let i = 0; i < 8; i++) 

            newTable[i] = [...table[i]]

        return newTable;
    }


    render() {
        return (
            <div>
                    <Plateau 
                        key={this.state.turn+'turn'}

                        clickable={true}
                        turn={this.state.turn}
                        color={this.props.color}
                        status={this.state.status}
                        move={this.state.move}
                        handleComfirmMove={(altCoord, newCoord)=>this.comfirmMove(altCoord, newCoord)}
                    />
            </div>
        )
    }
}


