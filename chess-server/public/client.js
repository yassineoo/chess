//const { json } = require("express");


let ws,clientId,player,role,room;
PORT = 5000
/*creat = document.getElementById("creat");
wb =document.getElementById("wb"); // white or black
//if this is true no pass required anyone can join
randomJoin = document.getElementById("randomJoin"); 

roomPass = document.getElementById("roomPass");
gametime = document.getElementById("gametime");
join = document.getElementById("join");
// if this is true no pass and no id required join any open room
joinRandom = document.getElementById("randomJoin");
// if false u have to enter id and pass
joinId = document.getElementById("joinId");
// if there is no pass u will join like spec
joinPass = document.getElementById("joinPass");
leave = document.getElementById("leave");
username = document.getElementById("username");
token = localStorage.getItem("token");*/
//***************************************************************************/

// websocket part ----------------------------------------------------------

//***************************************************************************/
      ws = new WebSocket(`ws://localhost:${PORT}`);
      ws.onopen = () => {
        console.log('Connection opened!')

        console.log(ws)
        const payLoad = {
          "method": "joinServer",
          "clientId": "token",
          ws
        }
        console.log(payLoad)
        console.log("ss "+JSON.stringify(payLoad));

        ws.send(JSON.stringify(payLoad))


      };
      
      
      ws.onmessage = ({ data }) =>{
        console.log(data)
        //cheak if it is correct json form

        if (isJsonParsable(data)) {
          
          obj=JSON.parse(data)
          
         switch (obj.method) {

              case "hello" : 
              //change it gor registed players
                  player={}
                  player.id=obj.clientId
                  clientId= obj.clientId // ik ik 
                  // player = obj.player
                  player.name = "guest"
                  console.log(player)
              break
              case "roomCreated":
                    room = obj.room;
                    console.log(room)
              break;

              case "wrongRoomId":
                
                    console.log("wrong Room Id try again")
              break;
              case "wrongRoomIdPassword":
                    console.log("wrong Room Password try again")
              break;
              case "joinAccepted":
                    room = obj.room;
                    role = obj.role;
                    console.log(room)
                    console.log(role)
              break;
              case "gameend" : 
                    console.log(obj.room)
                    room = null
                    role = null
              break;

            }
        }
    }
     ws.onclose = function() {
         ws=null;
      }
//***************************************************************************/

// eventListner Part ----------------------------------------------------------

//***************************************************************************/
 setTimeout(() => {
  creat.onclick= ()=>{
      if (room ) {
        alert("u are already in a room")
        return;
      }
      let white,black,owner="white";
      console.log(player)
      ws.send(JSON.stringify({
        "method":"creatRoom",
        "password":roomPass.value,
        "time" : gametime.value, 
        "player":player,
        "color":wb.value,
         owner,
      
  }))

  }   
}, 2000);  
//-------------------------------------------
  join.onclick= ()=>{
    console.log('vxxxxxxxx')
  ws.send(JSON.stringify({
    "method":"join",
    password:joinPass.value,
    id:joinId.value,
    player,
    clientId //change if error
  }))
 } 
//--------------------------------------------
leave.onclick= ()=>{
  ws.send(JSON.stringify({
    "method":"leave",
    role,
    clientId ,
    roomId:room.id
  }))
 }

//***************************************************************************/

// function part ----------------------------------------------------------

//***************************************************************************/
    var isJsonParsable = string => {
    
        try {
        JSON.parse(string);
        } catch (e) {
        return false;
        }
        return true;
        }