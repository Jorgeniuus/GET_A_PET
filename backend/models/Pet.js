const mongoose = require('../db/conn')
const { Schema } = mongoose

const User = mongoose.model(
    'Pet',
    new Schema({
        name: {type: String, required: true},
        age: {type: Number, required: true},
        weight: {type: Number, required: true},
        color: {type: String, required: true},
        images: {type: Array, required: true},
        available: {type: Boolean},
        user: Object,
        adopter: Object
    }, {timestamps: true})
    //this parameter timestamp create two new fields in db
    //1- createdAt when new data is created
    //2- updatedAt when some data is updated
)
module.exports = User