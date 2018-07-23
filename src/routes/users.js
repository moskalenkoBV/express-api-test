import express from 'express'
import Users from '../models/Users'
import parseErrors from '../utils/parseErrors'
import { ObjectId } from 'mongodb'

const router = express.Router()

router.post('/', (req, res) => {
  const data = req.body
  const user = new Users({
    _id: new ObjectId(),
    email: data.email,
    data: {
      address: data.address,
      firstName: data.firstName,
      lastName: data.lastName,
      country: data.country,
      nationality: data.nationality,
    }
  })
  user.setPassword(data.password)
  if(data.additionalAddress) {
    user.data.extra = {
      country: data.additionalCountry,
      address: data.additionalAddress
    }
  }
  user.save()
    .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
    .catch(err => res.status(400).json({ error: parseErrors(err.errors) }))
})

router.post('/login', (req, res) => {
  const data = req.body
  Users.findOne({ email: data.email }).then(user => {
    if(user) {
      if(user.isValidPassword(data.password)) {
        res.json({ user: user.toAuthJSON() })
      }
      else {
        res.status(400).json({ error: "Incorrect password" })
      }
    }
    else {
      res.status(400).json({ error: "User does not exist" })
    }
  })
})

router.get('/', (req, res) => {
  Users.find().then(users => {
    res.json(users)
  })
})

export default router