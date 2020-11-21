const router = require("express").Router();
const userWorkout = require("../models/workout.js");

//create new workout
router.post("/api/workouts", (req, res) => {
  userWorkout.create({})
        .then(workout => {
            res.json(workout);
        })
        .catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
});

//get all workouts
router.get("/api/workouts", (req, res) => {
  userWorkout.find({})
        .sort({ day: -1 })
        .then(workout => {
            return res.json(workout);
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json(err);
        });
});

//add excerise, set id, push to model, set true
router.put("/api/workouts/:id", ({ body, params }, res) => {
  userWorkout.findByIdAndUpdate(params.id, { $push: { exercises: body } }, { new: true, runValidators: true })
        .then(workout => {
            res.json(workout);
        }).catch(err => {
            console.log(err)
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", ({ body }, res) => {
  userWorkout.find({}).limit(5)
        .then(workout => {

            res.json(workout);
        })

});

module.exports = router;