const mongoose = require("mongoose")

var LegoSchema = new mongoose.Schema(
  {
    name: String,
    price: Number,
    image: String,  
    description: String

  },
  {
    versionKey: false //optional (to remove _v: 0 when add new data)
  }
)

var LegoSchema = mongoose.model('Lego', LegoSchema, 'lego')

module.exports = LegoSchema
