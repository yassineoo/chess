import React, { Component } from 'react'
import Plateau from './Plateau/Plateau';

import '../Style/font/font.css'
import '../Style/MainMenu.css'
import GameParamSelec from './GameParamSelec';

const PIECE = {
    NULL: 0,
    PION: 1,
}
const COLOR = {
  BLANC: 1,
  NOIR: -1
}
const plateauStatus = [
  [-3, -2, -4, -5, -6, -4, -2, -3],
  [-1, 0, -1, -1, -1, -1, -1, -1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, -1, 0, -1, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 1, 1, 1],
  [3, 2, 4, 6, 5, 4, 2, 3],
];

const move = {
  previousPieceInfo:{
    x: 1,
    y: 1,
  },
  newPieceInfo:{
    x: 1,
    y: 1,
  },
  consumedPiece: PIECE.NULL
}

export default class MainMenu extends Component {
    constructor(props){
        super(props);

        this.selectedGameMode = "";

        this.state = {
            showParamSelec: false
        }
    }

    launchGameRouter(gameParam){

        switch (this.selectedGameMode) 
        {
            case "CREATE":
                
                this.launchCreateRoom(gameParam);

            case "JOIN":
            
                this.launchJoinRoom(gameParam);

            case "IA":
        
                this.launchIA(gameParam);

        }
    }
    
    //=============================================

    initCreateRoom(){
        this.setState({
            showParamSelec: true
        });
    }

    initJoinRoom(){
    }

    initIA(){
        this.setState({
            showParamSelec: true
        });
    }

    //=============================================

    launchCreateRoom(gameParam){

    }

    launchJoinRoom(gameParam){
    }

    launchIA(gameParam){

    }


    render() {
        return (
            <div >
            
                <div id="mainMenuCTN">
                    <div>
                        <Plateau 
                            status={plateauStatus}
                            move={move}
                        />
                    </div>

                    <div id="mainMenuInterface">
                        <h1> ! أهلًا وسهلًا بك زميلنا الشطرنجي </h1>

                        <button 
                            onClick={this.initCreateRoom.bind(this)}
                            className="mainMenuBTN"
                        >
                            إنشاء غرفة جديدة
                        </button>

                        <button 
                            onClick={this.initJoinRoom.bind(this)}
                            className="mainMenuBTN"
                        >
                            الإنضمام إلى غرفة     
                        </button>

                        <button 
                            onClick={this.initIA.bind(this)}
                            className="mainMenuBTN"
                        >
                            اللعب ضد الحاسوب  
                        </button>
                    </div>
                </div>

                {this.state.showParamSelec && 
                    <GameParamSelec 
                        handleHideParam={()=>this.setState({showParamSelec: false})}
                        validate={(gameParam)=>this.launchGameRouter(gameParam)}
                    />
                }

            </div>
        )
    }
}
