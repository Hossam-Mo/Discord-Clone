const express = require("express");
const router = express.Router();
const Servers = require("../modules/servers");

router.get("/", (req, res) => {
  let gets = Servers.find()
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.json({ mess: err });
    });
});

router.get("/:id", (req, res) => {
  Servers.findById(req.params.id)
    .then((r) => {
      res.json(r);
    })
    .catch((err) => {
      res.json({ mess: err });
    });
});

router.post("/", (req, res) => {
  if (req.body.name) {
    let server = new Servers({
      name: req.body.name,
    });
    server
      .save()
      .then((r) => {
        res.json(r);
      })
      .catch((err) => {
        res.json({ mess: err });
      });
  } else {
    res.json({ mess: "please Enter a name" });
  }
});
module.exports = router;
