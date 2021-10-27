const {Player} = require('../db/player.js');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
getsign =(req,res)=> {
  
    res.render('sign');
    
  }
signin = async (req,res)=>{


  var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.email,
        pass: process.env.password
    }
});
  
    
    try {
        const {name, email, password } = req.body;

        // Validate user input
        if (!(email && password && name)) {
            console.log('All input is required');
            res.status(400).json({
              status:false,
              errorMessage:"All inputs are required"
              
            });
        }
      tmp = await Player.findOne({email});
      console.log("***",tmp);
     if (tmp)
     {
       req.flash('message','this email is already exists');
       console.log('this email is already exists');
       res.status(400).json({
        status:false,
        errorMessage:"this email is already exists"
        
      });
     }
    else {
     let encryptedPassword = await bcrypt.hash(password, 10);
     player  = await Player.create(
        {
            name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
            
          }
     );
      // Create token
    const token = jwt.sign(
        { user_id: player._id, email },
        process.env.SECRET,
        {
          expiresIn: "7d",
        }
      );
      // save user token
      const url = `http://localhost:${process.env.PORT}/sign/${token}`
      transporter.sendMail({
        from : process.env.email,
        to: email,
        subject: 'Verify Account',
        html: `Click <a href = '${url}'>here</a> to confirm your email.`
      },(err,sec)=>{
        if (err) console.log(err)
        else (console.log("secuss"))

      })
  
      // return new user
      //res.status(201).json(user);
      console.log('player created succsefly');
     req.flash('message','player created succsefly');
     res.status(201).json({
      status:true,
    
      
    });
  }
        
    } catch (error) {
       res.status(500).json(error,'something goes wrong please try again');
    } 
     
 }
 verify = async (req, res) => {
    const { token } = req.params
    // Check we have an id
    if (!token) {
        console.log('Missing Token ');
        return res.status(422).send({ 
             message: "Missing Token" 
        });
    }
    // Step 1 -  Verify the token from the URL
    let payload = null
    try {
        payload = jwt.verify(
           token,
           process.env.SECRET
        );


        // Step 2 - Find user with matching ID
        console.log(payload);
        const user = await Player.findOne({ _id: payload.user_id }).exec();
        if (!user) {
            console.log('User does not  exists ');
            return res.status(404).json({ 
              status : false,
              errorMessage: "User does not  exists" 
           });
        }
        // Step 3 - Update user verification status to true
        user.confirmed= true;
        await user.save();
        console.log('Account Verified ');
        return res.status(200).json({
          status : true,
          token: "Account Verified"
          });
     } catch (err) {
      return res.status(500).json({
        status : false,
        errorMessage: "server error :"+err
       });
     }
}
module.exports={getsign,signin,verify}

// function needed
function S4() {
  return (((1+Math.random())*0x10000)|0).toString(16).substring(1); 
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
