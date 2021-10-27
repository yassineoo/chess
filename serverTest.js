const express = require('express')
const path = require('path')





const app = express();

app.use(express.static('./chess-client/build'));

app.use('/', (req, res, next)=>{
    res.sendFile(path.join(__dirname, './chess-client/build/index.html'));

})

app.listen(7000, ()=>{
    console.log(11);
});
