const {Player} = require('../db/player.js');
bcrypt = require ('bcrypt');
getlog =(req,res)=> {
  
    res.render('log');
    
  }
login =async(req,res)=> {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).json({
          status:false,
          errorMessage:"All inputs are required"
          
        });
        console.log('all input is required ');
      }

        player = await Player.findOne({email})
        if (!player)
       
        {
          req.flash('sendmessage','no such email');
          console.log('no such email ');
          res.status(404).json({
            status:false,
            errorMessage:"no such email"
            
          });
        }
        else if (!player.confirmed) {
            req.flash('sendmessage','please confirm your email ');
            console.log('please confirm your email ');
            res.status(400).json({
              status:false,
              errorMessage:"please confirm your email"
              
            });
        }
      
       else {
        console.log("before");
       const rp = await bcrypt.compare(password,player.password)
       console.log(rp)
       console.log("after")
       if (!rp) {
           req.flash('sendmessage','wrong  password ');
           console.log('wrong  password ');
           res.status(400).json({
            status:false,
            errorMessage:"wrong  password"
            
          });
       }
      // req.session.logged = true
      // req.session.player = player;
  
       return res.status(200).json({
        status:true,
        player,
        token :guid() 
      });
      }
      
          } catch (error) {
            console.log(error);
            return res.status(400).json({
              status:false,
              errorMessage:"server error : "+ error
              
            });
          }
          }
    
  


logAsGuest =async(req,res)=> {
  
  res.status(200).json({
     status:true,
     token:guid()

  })
}
module.exports={getlog,login,logAsGuest}

//-----------------------------

function S4() {
return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
