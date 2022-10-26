const mongoose = require("mongoose")

var LegoSchema = new mongoose.Schema(
  {
    name: String,
    sku: String,
    image: String,  
    price: Number,
    status: Boolean,
    dom: Date,
    description: String,
    toybyage: String

  },
  {
    versionKey: false //optional (to remove _v: 0 when add new data)
  }
)

var LegoSchema = mongoose.model('Lego', LegoSchema, 'lego')

module.exports = LegoSchema
