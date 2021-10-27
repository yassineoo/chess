import React, { Component } from 'react'
import GameInterface from './GameInterface'

export default class RoomManager extends Component {

    constructor(){
        this.roomID = "";
        this.players = [];

        this.state = {
            status: 'waiting', //ingame
        }

    }

    render() {
        return (
            <div>
                <div>
                    <span>دخل محمد في الغرفة لاعبًا</span>
                    <span>دخل كمل في الغرفة لاعبًا</span>
                    <span>دخل طاهر في الغرفة مشاهدًا</span>
                    <span>خرج محمد من الغرفة</span>

                    <button>مستعد ؟</button>
                </div>

                <div>

                    <GameInterface />

                </div>

                <div>
                    <span>سلام<strong> :محمد </strong> </span>
                    <span>كي راك دير خي<strong> :طاهر </strong> </span>>

                    <button>برعث</button>     
                </div>
            </div>
        )
    }
}
