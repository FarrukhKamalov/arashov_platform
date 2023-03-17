const mongoose = require('mongoose');


const connectDb = async() => {
    try {
        mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log(`It is good: ${process.env.MONGO_URI}`)
        }).catch(error => {
            console.log(error.message)
        })
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = connectDb