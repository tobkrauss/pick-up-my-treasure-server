const mongoose = require("mongoose")
const { Schema, model } = mongoose

const treasureSchema = new Schema({
    owner:
    {
        type: String,
        required: true
    },
    title:
    {
        type: String,
        required: true
    },
    description: String,
    imageUrl: String,
    street:
    {
        type: String,
        required: true
    },
    zipcode:
    {
        type: Number,
        required: true
    },
    city: 
    {
        type: String,
        required: true
    },
    user: 
    {
        type: Schema.Types.ObjectId,
        ref: "User"
    },

    items: [{
        type: Schema.Types.ObjectId,
        ref: "Item"
    }]
})

module.exports = model("Treasure", treasureSchema)