"use strict";

var _require = require('../db/player.js'),
    Player = _require.Player;

var bcrypt = require('bcrypt');

var nodemailer = require("nodemailer");

var jwt = require("jsonwebtoken");
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/


getsign = function getsign(req, res) {
  res.render('sign');
};

signin = function signin(req, res) {
  var transporter, _req$body, name, email, password, encryptedPassword, token, url;

  return regeneratorRuntime.async(function signin$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "saddam48hd@gmail.com",
              pass: "0797475515"
            }
          });
          _context.prev = 1;
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password; // Validate user input

          if (!(email && password && name)) {
            console.log('All input is required');
            res.status(400).send("All input is required");
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(Player.findOne({
            email: email
          }));

        case 6:
          tmp = _context.sent;
          console.log("***", tmp);

          if (!tmp) {
            _context.next = 14;
            break;
          }

          req.flash('message', 'this email is already exists');
          console.log('this email is already exists');
          res.redirect('sign');
          _context.next = 28;
          break;

        case 14:
          _context.next = 16;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 16:
          encryptedPassword = _context.sent;
          _context.next = 19;
          return regeneratorRuntime.awrap(Player.create({
            name: name,
            email: email.toLowerCase(),
            // sanitize: convert email to lowercase
            password: encryptedPassword
          }));

        case 19:
          player = _context.sent;
          // Create token
          token = jwt.sign({
            user_id: player._id,
            email: email
          }, process.env.SECRET, {
            expiresIn: "7d"
          }); // save user token

          console.log('player created succsefly');
          player.token = token;
          url = "http://localhost:".concat(process.env.PORT, "/sign/").concat(token);
          transporter.sendMail({
            from: 'saddam48hd@gmail.com',
            to: email,
            subject: 'Verify Account',
            html: "Click <a href = '".concat(url, "'>here</a> to confirm your email.")
          }, function (err, sec) {
            if (err) console.log(err);else console.log("secuss");
          }); // return new user
          //res.status(201).json(user);

          console.log('player created succsefly');
          req.flash('message', 'player created succsefly');
          res.status(201).redirect('sign');

        case 28:
          _context.next = 33;
          break;

        case 30:
          _context.prev = 30;
          _context.t0 = _context["catch"](1);
          res.status(500).json(_context.t0, 'something goes wrong please try again');

        case 33:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 30]]);
};

verify = function verify(req, res) {
  var token, payload, user;
  return regeneratorRuntime.async(function verify$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          token = req.params.token; // Check we have an id

          if (token) {
            _context2.next = 4;
            break;
          }

          console.log('Missing Token ');
          return _context2.abrupt("return", res.status(422).send({
            message: "Missing Token"
          }));

        case 4:
          // Step 1 -  Verify the token from the URL
          payload = null;
          _context2.prev = 5;
          payload = jwt.verify(token, process.env.SECRET);
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](5);
          return _context2.abrupt("return", res.status(500).send(_context2.t0));

        case 12:
          _context2.prev = 12;
          // Step 2 - Find user with matching ID
          console.log(payload);
          _context2.next = 16;
          return regeneratorRuntime.awrap(Player.findOne({
            _id: payload.user_id
          }).exec());

        case 16:
          user = _context2.sent;

          if (user) {
            _context2.next = 20;
            break;
          }

          console.log('User does not  exists ');
          return _context2.abrupt("return", res.status(404).send({
            message: "User does not  exists"
          }));

        case 20:
          // Step 3 - Update user verification status to true
          user.confirmed = true;
          _context2.next = 23;
          return regeneratorRuntime.awrap(user.save());

        case 23:
          console.log('Account Verified ');
          return _context2.abrupt("return", res.status(200).send({
            message: "Account Verified"
          }));

        case 27:
          _context2.prev = 27;
          _context2.t1 = _context2["catch"](12);
          return _context2.abrupt("return", res.status(500).send(_context2.t1));

        case 30:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[5, 9], [12, 27]]);
};

module.exports = {
  getsign: getsign,
  signin: signin,
  verify: verify
};