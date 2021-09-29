
class Room{
    
      

        constructor(whitePlayer=null,blackPlayer=null,owner,id,password,time=15){
                this.owner=owner;
                this.whitePlayer =whitePlayer;
                this.blackPlayer =blackPlayer; 
                this.id = id;
                this.password=password
                this.spectators=[];
                this.state=[];
                this.chat="";
                this.game = {
                        state : "waiting" ,// not started yet
                        plateauStatus : [] ,
                        winner:null ,
                        time:time
                }

        }
        isEmpty(){
                return  !(this.spectators || this.blackPlayer || this.whitePlayer)  
                
        }
        isReady(){
                return (this.whitePlayer && this.blackPlayer)
        }
        
    
}

module.exports=Room