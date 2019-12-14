const express = require("express");
const projects = require("../data/helpers/projectModel");
const { validateProjectId } = require("../middleware/validate");
const router = express.Router();

router.get("/", (req, res, next) => {
  projects
    .get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      next(error);
    });
});

router.get("/:id", validateProjectId(), (req, res) => {
  res.json(req.project);
});

module.exports = router;
