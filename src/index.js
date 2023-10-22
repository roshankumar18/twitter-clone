const express= require('express')
require('dotenv').config()

const unknownRoutes = require('./middleware/unknownRoutes')
const connect = require('./dbonnection')

const app =express()
app.use(express.json())
app.use(express.static('public/index.html'))
connect()


app.use('/user',require('./router/userRoutes'))
app.use('/tweets',require('./router/tweetRoutes'))
app.use(unknownRoutes)
app.listen(process.env.PORT,()=>{
    console.log("server is ready ", process.env.PORT)
})