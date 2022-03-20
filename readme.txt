npm install express mongoose dotenv helmet morgan nodemon

express- 
mongoose- models
dotenv - secret url db name  kee
helmet- stay secure when request
morgan - login request in console
nodemon



const express = require('express')
const app = express()
const mongoose = requrie('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')



import & export routers
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)



creates models
User.js
username, email, password, profilePicture, coverPicture, followers, followings, isAdmin 


test with router.get register working or not
const User = new User({ username, email, password})   user.save




router.post('/register', async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })

    try {
       const user =  await newUser.save()
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
    }
})



const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(req.body.password, salt)


//Login
router.post('/login')
find user with email and validate with password


users.js
update user
delete user
get a user
follow user
unfollow user



//get a user   // here user._doc shows only jo hum dikhana  chahte hai
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, createdAt, ...other } = user._doc
         res.status(200).json(other)
    } catch (error) {
        
    }
})



////
Now create Post
model, router, index.js app.use

create a post
update a Post
delete a post
like a post
get a post
get timeline posts