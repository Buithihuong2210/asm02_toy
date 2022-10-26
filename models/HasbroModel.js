const mongoose = require("mongoose")

var HasbroSchema = new mongoose.Schema(
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

var HasbroModel = mongoose.model('Thuong Hieu1', HasbroSchema, 'hasbro')

module.exports = HasbroModel
