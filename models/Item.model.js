const mongoose = require("mongoose")
const { Schema, model } = mongoose

const itemSchema = new Schema({
    title: 
    {
        type: String,
        required: true
    },
    description: String,
    category: String,
    imageUrl: 
    {
        type: String,
    },
    condition: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    treasure: {
        type: Schema.Types.ObjectId,
        ref: "Treasure"
    },
},
{
    timestamps: true,
  }
)

module.exports = model("Item", itemSchema)