"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var mongoose = require('mongoose');

var player = mongoose.Schema({
  name: {
    type: String,
    required: [true, "must have name"],
    trim: true,
    maxlength: [20, "name can not be ùore than 20 carecter"]
  },
  id: {
    type: String,
    trim: true,
    maxlength: [20, "name can not be ùore than 20 carecter"]
  },
  email: _defineProperty({
    type: String,
    required: [true, "must have email"]
  }, "required", [true, "must have name"]),
  password: {
    type: String,
    required: [true, "must have password"],
    "default": 'not marked yet'
  },
  stat: {
    type: [String],
    "default": []
  },
  confirmed: {
    type: Boolean,
    "default": false
  },
  token: {
    type: String
  }
});
Player = mongoose.model('players', player);
module.exports = {
  Player: Player
};