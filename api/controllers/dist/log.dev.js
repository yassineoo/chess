"use strict";

var _require = require('../db/player.js'),
    Player = _require.Player;

bcrypt = require('bcrypt');

getlog = function getlog(req, res) {
  res.render('log');
};

login = function login(req, res) {
  var _req$body, email, password, rp;

  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;

          if (!(email && password)) {
            res.status(400).send("All input is required");
            console.log('all input is required ');
          }

          _context.next = 5;
          return regeneratorRuntime.awrap(Player.findOne({
            email: email
          }));

        case 5:
          player = _context.sent;

          if (player) {
            _context.next = 12;
            break;
          }

          req.flash('sendmessage', 'no such email');
          console.log('no such email ');
          res.redirect('/login');
          _context.next = 26;
          break;

        case 12:
          if (player.confirmed) {
            _context.next = 18;
            break;
          }

          req.flash('sendmessage', 'please confirm your email ');
          console.log('please confirm your email ');
          res.redirect('/login');
          _context.next = 26;
          break;

        case 18:
          console.log("before");
          _context.next = 21;
          return regeneratorRuntime.awrap(bcrypt.compare(password, player.password));

        case 21:
          rp = _context.sent;
          console.log(rp);
          console.log("after");

          if (!rp) {
            req.flash('sendmessage', 'wrong  password ');
            console.log('wrong  password ');
            res.redirect('/login');
          }

          res.status(200).send('hi');

        case 26:
          _context.next = 32;
          break;

        case 28:
          _context.prev = 28;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          res.status(500).send(_context.t0);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 28]]);
};

module.exports = {
  getlog: getlog,
  login: login
};