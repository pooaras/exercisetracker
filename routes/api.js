const express = require('express')
const router = express.Router();
const User = require('../Modals/User')
const Exercises = require('../Modals/Excercise')
router.post('/users', async(req, res) => {
    console.log(req.body,'reqff');
    
    const username = req.body.username;
    // const userid = req.body.username;
    try {
        const user = await User.findOne({username:username})
        if (user) {
            res.send(user)
        }
        else {
            console.log(user,'foewa');
            const newUser = new User({
                username:username
            })
            newUser.save()
            res.send(newUser)
        }
    }
    catch (e) {
        res.status(500).send(e)
    }
})
router.post('/users/:id/exercises/', async(req, res) => {
    console.log(req.body,req.params, 'reqff');
    const {  description, duration, date } = req.body;
    const { id } = req.params;
    try {
        const user = await User.findById(id)
        console.log(user,'feoa');
        
        if (user) {
            const exercise = new Exercises({
                username: user.username,
                description: description,
                duration: duration,
                date: date ? new Date(date) : new Date(),
                userId: user._id
            })
            await exercise.save();
            res.send({
                username: exercise.username,
                description: exercise.description,
                duration: exercise.duration,
                date: new Date(exercise.date).toDateString(),
                _id: exercise._id
            });
        }
        else {
            res.send("User does not exist")
        }
    }
    catch(e) {
        res.send(e)
    }
})
module.exports = router;