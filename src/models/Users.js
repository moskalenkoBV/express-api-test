import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'
import jwt from 'jsonwebtoken'

const schema = new mongoose.Schema({
  email: {type: String, unique: true},
  passwordHash: String,
  firstName: String,
  lastName: String,
  address: String,
  country: {
    label: String,
    value: String
  },
  nationality: {
    label: String,
    value: String
  },
  addressAdditional: String,
  countryAdditional: {
    label: String,
    value: String
  }
}, { timestamps: true })

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10)
}

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash)
}

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_SECRET
  )
}

schema.methods.decodeJWT = function decodeJWT(token) {
  return jwt.verify(token, process.env.JWT_SECRET)
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    token: this.generateJWT()
  }
}

schema.plugin(uniqueValidator, { message: 'This email is already taken' })

export default mongoose.model('Users', schema)