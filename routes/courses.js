const Joi = require("joi");
const express = require("express");
const router = express.Router();

const courses = [
  { id: 1, name: "course 1" },
  { id: 2, name: "course 2" },
  { id: 3, name: "course 3" },
];

router.get("/api/courses", (req, res) => {
  res.send(courses);
});

router.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) res.status(404).send("Course not found with the given id.");
  res.send(course);
});

router.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

router.put("/api/courses/:id", (req, res) => {
  const courseInDb = courses.find((c) => c.id === parseInt(req.params.id));
  if (!courseInDb)
    return res.status(404).send("The course with the given id was not found.");

  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  courseInDb.name = req.body.name;
  res.send(courseInDb);
});

router.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("The course with the given id has been already deleted.");
  courses.splice(courses.indexOf(course), 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

module.exports = router;
