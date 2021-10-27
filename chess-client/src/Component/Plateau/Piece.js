import React, { Component } from 'react'
import { Spring, animated } from 'react-spring';

import '../../Style/Plateau.css'


export default class Piece extends Component {



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


    render() {
        let position  = this.props.position,
            newPosition = this.props.newPosition;

        let cursor = (this.props.color * this.props.pieceID > 0 ? 'pointer' : 'initial');

        return (
            <Spring

                from={{
                    top: position.top,
                    left: position.left,
                    opacity: '1'
                }}

                to={{
                    top: this.props.translation ? newPosition.top : position.top,
                    left:  this.props.translation ? newPosition.left : position.left,

                    opacity: this.props.fadeIn ? '0' : '1',
                }}

                onRest={ ()=>
                        this.props.HandleEndMoveAnim(this.props.translation)
                    }
            >
                { styles => (
                    <animated.div
                        className={'pieceElement'}
                        style={{...styles, cursor, zIndex: this.props.translation ? 10 : 1}}
                    >
                        <img src={this.loadPieceUrl(this.props.pieceID)}>
    
                        </img>
                    </animated.div>
                )}
            </Spring>
        );
    }
}
