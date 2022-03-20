const User = require('../models/User')
const router = require('express').Router();

//Update User
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.send(500).json(error)
            }
        }
    }
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        })
        res.status(200).json('Acccout has been updated')
    } catch (error) {
        return res.status(403).json('You can update only your account!')
    }

})

//Delete a User
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('Account has been deleted')
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json('You can delete only your account!')
    }
})


//Get a User
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, createdAt, ...other } = user._doc
        res.status(200).json(other)
    } catch (error) {

    }
})


//Follow a User
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { followings: req.params.id } })
                res.status(200).json('User has been followed')
            }
            else {
                res.status(403).json('you already follow this user')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        return res.status(403).json('You cannot follow yourself ')
    }
})


//Unfollow a User
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)
            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { followings: req.params.id } })
                res.status(200).json('User has been unfollowed')
            }
            else {
                res.status(403).json('you dont follow this user')
            }
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        return res.status(403).json('You cant unfollow yourself ')
    }
})



router.get('/get/all', async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).send(user)
    } catch (e) {
        console.log(e)
    }
})





module.exports = router