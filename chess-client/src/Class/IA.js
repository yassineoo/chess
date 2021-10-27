import Plateau from '../Component/Plateau/Plateau';


export default class PlayerIA{

    constructor(status, color){

        this.status = status;
        this.color = color;

    }

    setIAStatus(status){
        this.status = status;
    }

    getIAMove(){
        
        let pieceSelected = false,
            pickedMove,
            coord;

        do{//Ya reb, 3ashwaii

            let absuh = this.status.flat().map((v, i)=>{
                return { x: i%8 , y: Math.floor(i/8), piece: v }
            }).filter((e)=>e.piece * this.color > 0);


            coord = absuh[ getRandomInt(0, absuh.length) ];


            let movesTable = Plateau.findPossibleMoves(coord.x, coord.y, this.color, this.status);

            let movesList = movesTable.flat();

            pieceSelected = movesList.indexOf(1) !== -1;


            if ( pieceSelected ){

                    let moveCoord = movesList.map(
                        (value, index) => {
                            return { x: index% 8 , y: Math.floor(index/8), kayen: value }
                        }
                    ).filter((e)=>e.kayen);//Chab


                    pickedMove = moveCoord[ getRandomInt(0, moveCoord.length) ];

            }

        }while( !pieceSelected );


        return {
            previousPieceInfo:{
              x: coord.x,
              y: coord.y,
            },
            newPieceInfo:{
              x: pickedMove.x,
              y: pickedMove.y,
            },
            consumedPiece: this.status[pickedMove.y][pickedMove.x],
        };
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
