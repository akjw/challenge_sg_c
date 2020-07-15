const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listSchema = Schema({
    item: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
})
/* 
will create and auto update these two fields:
createdAt:
updatedAt:
*/
const Cuisine = mongoose.model("Cuisine", cuisineSchema)
module.exports = Cuisine;