const mongoose = require('mongoose')
let connect
try{
 connect = async()=>{
    const connectiion = await mongoose.connect(process.env.CONN_STRING)
    console.log(connectiion.connection.host)
}}catch(err){
    console.log(err)
}

module.exports = connect