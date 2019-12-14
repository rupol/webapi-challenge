const express = require("express");
const actions = require("../data/helpers/actionModel");
const { validateActionId, validateAction } = require("../middleware/validate");
const router = express.Router();

router.get("/", (req, res, next) => {
  actions
    .get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id", validateActionId(), (req, res) => {
  res.json(req.action);
});

module.exports = router;
