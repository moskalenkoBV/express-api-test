import express from 'express'
import Products from '../models/Products'

const router = express.Router()

router.get('/', (req, res) => {
  Products.find().then(products => {
    if(products.length > 0) {
      res.json(products)
    } 
    else {
      res.status(400).json({ errors: { products: "No Products" }})
    }
  })
})

export default router