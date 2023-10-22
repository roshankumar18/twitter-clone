const mongoose = require('mongoose')
const connect = async()=>{
    const connectiion = await mongoose.connect(process.env.CONN_STRING)
    console.log(connectiion.connection.host)
}

module.exports = connect