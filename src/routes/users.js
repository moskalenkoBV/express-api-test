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
    address: data.address,
    firstName: data.firstName,
    lastName: data.lastName,
    country: data.country,
    nationality: data.nationality,
    countryAdditional: '',
    addressAdditional: ''
  })
  user.setPassword(data.password)

  if(data.addressAdditional) {
    user.countryAdditional = data.countryAdditional
    user.addressAdditional = data.addressAdditional
  }
  user.save()
    .then(userRecord => res.json({ user: userRecord.toAuthJSON() }))
    .catch(err => res.status(400).json({ error: parseErrors(err.errors) }))
})

router.post('/update', (req, res) => {
  (async () => {
    const { userData, token } = req.body
    const user = new Users()
    const userHandler = user.decodeJWT(token)
    const userDataNew = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      address: userData.address,
      nationality: userData.nationality,
      password: user.setPassword(userData.password),
      country: userData.country,
      email: userData.email,
      addressAdditional: userData.addressAdditional,
      countryAdditional: userData.countryAdditional
    }

    Users.findOneAndUpdate({ _id: userHandler._id }, userDataNew, { new: true }).then(userRecord => {
      if(userRecord) {
        res.json({ userData: {
          firstName: userRecord.firstName,
          lastName: userRecord.lastName,
          address: userRecord.address,
          email: userRecord.email,
          emailConfirm: userRecord.email,
          country: userRecord.country,
          nationality: userRecord.nationality,
          addressAdditional: userRecord.addressAdditional,
          countryAdditional: userRecord.countryAdditional
        } })
      }
      else {
        res.status(400).json({ error: "User does not exist" })
      }
    })
  })()
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

router.post('/userdata', (req, res) => {
  const data = req.body
  const user = new Users()
  let userHandler

  try {
    userHandler = user.decodeJWT(data.token)
    Users.findOne({ _id: userHandler._id }).then(user => {
      if(user) {
        const userData = {
          email: user.email,
          emailConfirm: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          address: user.address,
          country: user.country,
          nationality: user.nationality,
          addressAdditional: '',
          countryAdditional: ''
        }
        if(user.addressAdditional) {
          userData.addressAdditional = user.addressAdditional,
          userData.countryAdditional = user.countryAdditional
        }
        res.json(userData)
      }
      else {
        res.status(400).json({ token: "Incorrect token" })
      }
    })
  }
  catch(e) {
    res.status(400).json({ token: "Incorrect token" })
  }
})

router.get('/', (req, res) => {
  Users.find().then(users => {
    res.json(users)
  })
})

export default router