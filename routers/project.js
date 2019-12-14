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

router.delete("/:id", validateProjectId(), (req, res, next) => {
  projects
    .remove(req.project.id)
    .then(count => {
      if (count > 0) {
        res.status(200).json({ message: "The project has been deleted" });
      }
    })
    .catch(error => {
      next(error);
    });
});

router.put("/:id", validateProjectId(), validateProject(), (req, res, next) => {
  projects
    .update(req.project.id, req.body)
    .then(projectObj => {
      res.status(200).json(projectObj);
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
