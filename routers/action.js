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

router.delete("/:id", validateActionId(), (req, res, next) => {
  actions
    .remove(req.action.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The post has been deleted" });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.put("/:id", validateActionId(), validateAction(), (req, res, next) => {
  actions
    .update(req.action.id, req.body)
    .then(actionObj => {
      res.status(200).json(actionObj);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
