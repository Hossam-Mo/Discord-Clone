const express = require("express");
const router = express.Router();
const message = require("../modules/message");
const Servers = require("../modules/servers");
router.get("/:id", (req, res) => {
  Servers.findById(req.params.id)
    .then((r) => {
      res.json(r.messages);
    })
    .catch((err) => {
      res.json({ mess: err });
    });
});
router.post("/", (req, res) => {
  let messages = new message({
    name: req.body.name,
    img: req.body.img,
    message: req.body.message,
    sid: req.body.sid,
  });
  Servers.updateOne({ _id: messages.sid }, { $push: { messages } })
    .then((r) => {
      res.json({ mess: "your message has been sended" });
    })
    .catch((err) => {
      res.json({ mess: err });
    });
});

module.exports = router;
