import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import products from './routes/products'
import users from './routes/users'
import bodyParse from 'body-parser'
import dotenv from 'dotenv'
import Promise from 'bluebird'

const app = express()

dotenv.config()

mongoose.Promise = Promise

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true })

app.use(bodyParse.json())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use('/api/products', products)

app.use('/api/users', users)

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3002, () => { console.log('Back is up on 3002') })