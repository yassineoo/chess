require("dotenv").config();
const connect = require('./api/db/connect.js');
const express = require('express')

const log = require('./api/routes/login')
const sign = require('./api/routes/sign')
const app = express()
const session = require('express-session');
const flash = require('req-flash');
const WebSocket = require('ws');
const { uri,PORT } = process.env;
console.log(typeof uri)
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/login',log);
app.use('/sign',sign);



start = async ()=> {
    try {
  
      await connect(
          uri, { useNewUrlParser: true, useUnifiedTopology: true }
          )
          const server = app.listen(PORT, () => {
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
  

