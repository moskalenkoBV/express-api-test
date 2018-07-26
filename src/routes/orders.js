import express from 'express'
import mongoose from 'mongoose'
import Orders from '../models/Orders'
import { ObjectId } from 'mongodb'
import nodemailer from 'nodemailer'
import calcPriceSingle from '../utils/calcPriceSingle'
import calcPriceTotal from '../utils/calcPriceTotal'
import exphbs from 'express-handlebars'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ message: 'works!' })
})

router.post('/', (req, res) => {
  (async () => {
    const { email, products, firstName, lastName } = req.body
    const order = new Orders({
      _id: new ObjectId(),
      email: email,
      products: products
    })
    const hbs = exphbs.create()
    const templateData = {
      products: [],
      totalPrice: 0,
      firstName: firstName,
      lastName: lastName
    }
    let emailTemplate;

    templateData.products = order.products.map(item => (
      { title: item.title, amount: item.amount, price: `€ ${calcPriceSingle(item.price, item.amount, item.bonus).toFixed(2)}`, bonus: item.bonus ? item.bonus.label : false }
    ))

    templateData.totalPrice = `€ ${calcPriceTotal(order.products).toFixed(2)}`

    emailTemplate = await hbs.render('src/views/layouts/email-order.hbs', templateData)
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
      subject: `Your order № ${order._id}`,
      html: emailTemplate
    }

    transporter.sendMail(mailOptions, (error, info) => {
      if(error) {
        res.status(400).json({ result: "Your order is not accepted", message: "Try again!" })
      }
      else {
        order.save()
          .then(() => res.json({ result: "Your order is accepted.", message: "Check is sent to your Email!" }))
          .catch(err => res.status(400).json({ result: "Your order is not accepted", message: "Try again!" }))
      }
    })
  })()
})

export default router