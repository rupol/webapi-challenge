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

function validateProject() {
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing project data" });
    } else if (!req.body.name) {
      return res.status(400).json({ message: "missing required name field" });
    } else if (!req.body.description) {
      return res
        .status(400)
        .json({ message: "missing required description field" });
    }
    next();
  };
}

module.exports = { validateProjectId, validateProject };
