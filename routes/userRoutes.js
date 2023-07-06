const router = require('express').Router();
const { User, Reaction} = require('../models');
const ObjectId = require('mongodb').ObjectId;

// GET all users
router.get('/', async (req, res) => {

    try {

        const users = await User.find();
        res.status(200).json(users);

    } catch (err) {

        res.sendStatus(500).json(err);

    }

});


// GET a single user by ID
router.get('/:id', async (req, res) => {

    try {

        const user = await User.findById(req.params.id);
        if (!user) {

            res.status(404).json({ message: 'No user found with this id!'});
            return;

        }
        res.status(200).json(user);

    } catch (err) {

        res.status(500).json(err);

    }

});


// Create a new user
router.post('/', async (req, res) => {
    console.log("getting users",req.body)

    try {

        const user = await User.create(req.body);
        res.status(200).json(user);

    } catch (err) {

        res.status(500).json(err);

    }
});


router.put('/:id/friends/delete', async (req, res) => {
    console.log("getting users",req.params.id, "friends id:",req.body.friendId)

    try {


        const result = await User.findByIdAndUpdate(
            req.params.id,
            { $push: {friends: req.body.friendId} },
            //{ new: true } //create new document if not found
        );

        res.json(result)

    } catch (err) {
        console.log(err)

        res.status(500).json(err);

    }
});



router.put('/:id/friend/:friendId', async (req, res) => {
    console.log("getting users",req.params.id, "friends id:",req.params.friendId)

    try {

        const result = await User.findByIdAndUpdate(
            req.params.id,
            { $push: {friends: new ObjectId(req.params.friendId)} },
            { new: true } //create new document if not found
        );

        //isntead of push use addToSet // to add only one


        res.json(result)

    } catch (err) {
        console.log(err)

        res.status(500).json(err);

    }
});

router.delete('/:id/friend/:friendId', async (req, res) => {
    console.log("getting users delete",req.params.id, "friends id:",req.params.friendId)

    try {

        const result = await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { friends: new ObjectId(req.params.friendId) } },
        );


        res.json(result)

    } catch (err) {
        console.log(err)

        res.status(500).json(err);

    }
});


// Update an existing user
router.put('/:id', async (req, res) => {
    console.log("hello put", req.params.id, req.body, new ObjectId(req.params.id))

    try {

        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }

        );

        console.log(user)
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json(user);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});


// Delete a user
router.delete('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.status(200).json({ message: 'User deleted!' });
    } catch (err) {
        res.status(500).json(err);
    }
});



module.exports = router;

