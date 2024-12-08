const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
    'User',
    new Schema({
        name: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        image: {type: String},
        phone: {type: String, required: true}
    }, {timestamps: true})
    //this parameter timestamp create two new fields in db
    //1- createdAt when new data is created
    //2- updatedAt when some data is updated
)
module.exports = User