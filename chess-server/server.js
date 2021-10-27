
//  initialisation   .....................
require("dotenv").config();

const connect = require('./api/db/connect.js');
const express = require('express')
const log = require('./api/routes/login')
const sign = require('./api/routes/sign')
const app = express()
const session = require('express-session');
const flash = require('req-flash');
const path = require('path')
const WebSocket = require('ws');


const Player  = require("./Class/player");
const Room  = require("./Class/room");


const { uri, PORT } = process.env;
console.log(PORT)
// middelwares and routes ----------------------

app.use(express.urlencoded( { extended:false } ));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
       maxAge:60000*60*24,
       }
  }))
app.use(express.json()); 
app.use(flash());
app.set('view engine',"ejs");
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('./chess-client/build'));
/*
app.use('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname, './chess-client/build/index.html'));

})
*/
app.get('/', (req, res) => {
  res.status(200).render('client')
})

app.use('/login',log);
app.use('/sign',sign);



//----------------------------------------

// webosket ------------------------



const wss = new WebSocket.Server({ noServer: true });
const clientsx={};
const rooms={};

wss.on('connection', function connect(ws) {

  //send back the client connect id
 // ws.send(JSON.stringify(payLoad))


  ws.on('message', function incoming(data) {

    
    if ( isJsonParsable(data)){
        obj=JSON.parse(data)
        console.log(obj)
        
        switch (obj.method) {
         //-------------------------
         case "hello" : 


         //------------------------
          case "creatRoom" : 
           
                let roomId = guid(); //guid is function generate a random id 
                let room=new Room(obj.player,obj.color, roomId, obj.password, obj.time);
                rooms[roomId] = room
                ws.send(JSON.stringify({"method":"roomCreated",room}))
            
            
            break;
          //--------------------------------------
          case "join" :
            console.log("join ask")
            // with id
            if (Object.hasOwnProperty.call(rooms,obj.id ))
            {
                let role;
              if (obj.password){
                if ((obj.password==rooms[obj.id].password)) 
                {
                  
                      if (rooms[obj.id].whitePlayer)
                        {
                            rooms[obj.id].blackPlayer=clientsx[obj.clientId]//change if error 
                            role = "blackPlayer"
                        }
                       else 
                        {
                          rooms[obj.id].whitePlayer=clientsx[obj.clientId] // change if error
                          role = "whitePlayer";
                        }
                }
                else ws.send((JSON.stringify({"method":"wrongRoomPassword"})))                  
              }
              else 
              {
            
                  rooms[roomId].spectators.push(clientsx[obj.clientId])
                  role = "spectator";
          
              }

              ws.send(JSON.stringify({"method":"joinAccepted",role,room:rooms[obj.id]}))
     
            }
             else ws.send((JSON.stringify({"method":"wrongRoomId"})))
            break;

           //--------------------------------------------

          case "joinRandom":
                             
 

            break;
        //------------------------------------
          
        //------------------------------------
          case "leaveTheRoom" :
                roomId=obj.roomId;
               if (obj.role ==="whitePlayer"||obj.role ==="blackPlayer")  {

                 rooms[roomId].game.state = "end";
                 if (obj.role ==="whitePlayer"){
                  rooms[roomId].game.winner="blackPlayer";
                  rooms[roomId].blackPlayer=null;
                 }
                 if (obj.role ==="blackPlayer"){
                  rooms[roomId].game.winner="whitePlayer";
                  rooms[roomId].whitePlayer=null;
                 }
                 //delete the room 
                 sendToAll(roomId,
                   JSON.stringify({"method":"gameend","room":rooms[roomId]})
                 )
              
                 // delete rooms[roomId];
                 if (rooms[roomId].isEmpty() ) delete rooms[roomId];
                 // not nessery later ............

               }                          
              else {
                rooms[roomId].spectators.filter((spec)=>{spec.id!==obj.id})
              }
  
          break;

         case "startTheGame":
           room = rooms[obj.roomId]
            if(room.isReady() && room.game.state != "playing" ){
              room.game.plateauStatus = [
                [-3, -2, -4, -5, -6, -4, -2, -3],
                [-1, -1, -1, -1, -1, -1, -1, -1],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0],
                [1, 1, 1, 1, 1, 1, 1, 1],
                [3, 2, 4, 6, 5, 4, 2, 3],
              ]
            sendToAll(obj.roomId,{
              game:room.game
            })
            }
         break;
         case "updateThestate":

          room = rooms[obj.roomId]
          if(room.game.state == "playing"){
            room.game.plateauStatus = obj.plateauStatus
          sendToAll(obj.roomId,{
            game:room.game
          })
          }
           
         break;

         case "Drawoffer":

          room = rooms[obj.roomId]
          if(room.game.state == "playing"){
            room.game.plateauStatus = obj.plateauStatus
          sendToAll(obj.roomId,{
            game:room.game
          })
          }
           
         break;
         
     }

    }


  }
  )
  




}
 


)



// strat function : real server 
start = async ()=> {
    try {
  
     /* await connect(
          uri, { useNewUrlParser: true, useUnifiedTopology: true }
          )*/
          const server =  app.listen(5000, () => {
            console.log(`Example app listening at http://localhost:${PORT}`)
          });
         server.on('upgrade', (request, socket, head) => {
            wss.handleUpgrade(request, socket, head, socket => {
              wss.emit('connection', socket, request);
            });
          });
                
    } catch (error) {
       console.log(error); 
    } 
  
  }
  start();
  
//-------------------------------------
// functions needed 
var isJsonParsable = string => {
 
  try {
  JSON. parse(string);
  } catch (e) {
  return false;
  }
  return true;
  }

  
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();


const sendToAll = (roomId,obj)=>{
  for (let index = 0; index < rooms[roomId].spectators.length; index++) {
    const element = rooms[roomId].spectators[index];
   clientsx[element.id].ws.send(obj)
  }
  clientsx[rooms[roomId].whitePlayer.id].ws.send(obj);
  clientsx[rooms[roomId].blackPlayer.id].ws.send(obj);
}
