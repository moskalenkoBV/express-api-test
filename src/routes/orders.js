import express from 'express'
import mongoose from 'mongoose'
import Orders from '../models/Orders'
import { ObjectId } from 'mongodb'
import nodemailer from 'nodemailer'

const router = express.Router()

router.post('/', (req, res) => {
  const { email, products } = req.body
  const order = new Orders({
    _id: new ObjectId(),
    email: email,
    products: products
  })

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'adyaxreacttest@gmail.com',
      pass: 'adyaxReactTest@'
    }
  })

  const mailOptions = {
    from: '<b.v.moskalenko@gmail.com>',
    to: email,
    subject: 'React Adyax Test',
    html: '<b>Hello Worlds</b>'
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
      res.status(400).json({ result: "Your order is not accepted(email Issue)", message: "Try again!" })
    }
    else {
      order.save()
        .then(() => res.json({ result: "Your order is accepted.", message: "Check is sent to your Email!" }))
        .catch(err => res.status(400).json({ result: "Your order is not accepted(save Issue)", message: "Try again!" }))
    }
  })
})

export default router