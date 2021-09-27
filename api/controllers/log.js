const {Player} = require('../db/player.js');
bcrypt = require ('bcrypt');
getlog =(req,res)=> {
  
    res.render('log');
    
  }
login =async(req,res)=> {
    try {
      const { email, password } = req.body;

      if (!(email && password)) {
        res.status(400).send("All input is required");
        console.log('all input is required ');
      }

        player = await Player.findOne({email})
        if (!player)
       
        {
          req.flash('sendmessage','no such email');
          console.log('no such email ');
          res.redirect('/login')
        }
        else if (!player.confirmed) {
            req.flash('sendmessage','please confirm your email ');
            console.log('please confirm your email ');
            res.redirect('/login')
        }
      
       else {
        console.log("before");
       const rp = await bcrypt.compare(password,player.password)
       console.log(rp)
       console.log("after")
       if (!rp) {
           req.flash('sendmessage','wrong  password ');
           console.log('wrong  password ');
          return res.redirect('/login')
       }
       return res.status(200).send('hi')
      }
      
          } catch (error) {
            console.log(error);
            res.status(500).send(error);
          }
    
  }
module.exports={getlog,login}
