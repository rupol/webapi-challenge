const express = require("express");
const projects = require("../data/helpers/projectModel");
const actions = require("../data/helpers/actionModel");

function validateProjectId() {
  return (req, res, next) => {
    projects
      .get(req.params.id)
      .then(project => {
        if (project) {
          req.project = project;
          next();
        } else {
          res.status(404).json({ message: "Project not found" });
        }
      })
      .catch(error => {
        next(error);
      });
  };
}

module.exports = { validateProjectId };
