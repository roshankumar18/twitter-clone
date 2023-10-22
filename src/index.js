const express= require('express')

const app =express()
app.use(express.json())

app.use('/user',require('./router/userRoutes'))
app.use('/tweets',require('./router/tweetRoutes'))
app.listen(3000,()=>{
    console.log("server is ready")
})