const express = require("express");
const projects = require("../data/helpers/projectModel");
const {
  validateProjectId,
  validateProject
} = require("../middleware/validate");
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

router.post("/", validateProject(), (req, res, next) => {
  projects
    .insert(req.body)
    .then(project => {
      res.status(201).json(project);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
