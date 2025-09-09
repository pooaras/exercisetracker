const express = require("express");
const router = express.Router();
const User = require("../Modals/User");
const Exercises = require("../Modals/Excercise");
router.post("/users/", async (req, res) => {
  console.log(req.body, "reqff");
  const username = req.body.username;
  if (!username) {
    return res.status(400).send({ error: "Username is required" });
  }
  // const userid = req.body.username;
  try {
    const user = await User.findOne({ username: username });
    if (user) {
      res.send(user);
    } else {
      console.log(user, "foewa");
      const newUser = new User({
        username: username,
      });
      newUser.save();
      res.send(newUser);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});
router.post("/users/:id/exercises/", async (req, res) => {
  console.log(req.body, req.params, "reqff");
  const { description, duration, date } = req.body;
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    console.log(user, "feoa");

    if (user) {
      const exercise = new Exercises({
        username: user.username,
        description: description,
        duration: duration,
        date: date ? new Date(date) : new Date(),
        userId: user._id,
      });
      await exercise.save();
      res.send({
        username: exercise.username,
        description: exercise.description,
        duration: exercise.duration,
        date: new Date(exercise.date).toDateString(),
        _id: user._id,
      });
    } else {
      res.send("User does not exist");
    }
  } catch (e) {
    res.send(e);
  }
});
router.get("/users/", async (req, res) => {
  const users = await User.find({},"username _id")
  res.send(users)
});
router.get("/users/:_id/logs/", async (req, res) => {
  const { _id } = req.params;
  const { from, to, limit } = req.query;
  // console.log(req.query,'feaofae');

  try {
    const user = await User.findById(_id);
    console.log(user, "feoa", _id);

    if (user) {
      const exercise = await Exercises.find({ userId: _id });
      console.log(exercise, "fewao");
      const logs = exercise.filter(
        (item) =>
          new Date(item.date) > new Date(from) &&
          new Date(item.date) < new Date(to)
      ).slice(limit);
      res.send({
        username: exercise.username,
        count: logs.length,
        _id: _id,
        log: logs.map((item) => ({
          description: item.description,
          duration: item.duration,
          date: new Date(item.date).toDateString(),
        })),
      });
    } else {
      res.send("User does not exist");
    }
  } catch (e) {
    res.send(e);
  }
});
module.exports = router;
