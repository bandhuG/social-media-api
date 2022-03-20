const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRouter = require('./routes/post')

dotenv.config();

mongoose.connect(process.env.MONGO_URL, { 
    useUnifiedTopology: true } )
    .then(console.log('connected to database'))
    .catch((err) => console.log(err))
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));


app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/post', postRouter)

app.listen(3000, () => {
    console.log('server is running')
})