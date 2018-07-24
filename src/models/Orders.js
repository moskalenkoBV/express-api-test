import mongoose from 'mongoose'

const schema = new mongoose.Schema({
  email: String,
  products: Array
}, { timestamps: true })

export default mongoose.model('Orders', schema)