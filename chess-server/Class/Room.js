
class Room{
    
      

        constructor(player,color,id,password,time=15){
            
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
        
                if(color==2) 
                {  
                   if (Math.random()>0.5){
                        this.owner="white";
                        this.whitePlayer =player;
                   }
                   else {
                         this.owner="black";
                        this.whitePlayer =player;
                       

                   }
                }
              if(color==0) 
               { this.owner="white";
                this.whitePlayer =player;
               }
               else (color==1) 
               { this.owner="black";
                this.whitePlayer =player;
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