const mangoose = require("mongoose");

const message = mangoose.Schema({
  name: {
    type: String,
    require: true,
  },
  img: {
    type: String,
    require: true,
  },
  message: {
    type: String,
    require: true,
  },
  sid: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mangoose.model("message", message);
