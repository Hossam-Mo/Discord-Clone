const mongoose = require("mongoose");

const servers = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  messages: Array,
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Servers", servers);
