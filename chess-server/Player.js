class Player {

    constructor(ws,id,name="",state="geust",statisique=[]){
        this.ws = ws ; 
        this.id = id;
        this.name=name;
        this.state=state;
        this.statisique=statisique;
    }
    changestate(){
        this.state="player"
    }

}
module.exports=Player