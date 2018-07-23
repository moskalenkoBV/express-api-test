import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  title: String,
  description: String,
  price: String,
  min: Number,
  max: Number
}, { timestamps: true })

export default mongoose.model('Products', schema)