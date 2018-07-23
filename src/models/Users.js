import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import uniqueValidator from 'mongoose-unique-validator'
import jwt from 'jsonwebtoken'

const schema = new mongoose.Schema({
  email: {type: String, unique: true},
  passwordHash: String,
  data: {
    firstName: String,
    lastName: String,
    address: String,
    country: String,
    nationality: String,
    extra: {
      address: String,
      country: String
    }
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
      email: this.email
    },
    process.env.JWT_SECRET
  )
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    token: this.generateJWT()
  }
}

schema.plugin(uniqueValidator, { message: 'This email is already taken' })

export default mongoose.model('Users', schema)