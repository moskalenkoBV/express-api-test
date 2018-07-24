import calcPriceSingle from './calcPriceSingle'

const calcPriceTotal = products => {
  let totalPrice = 0
  products.forEach(item => {
    totalPrice += calcPriceSingle(item.price, item.amount, item.bonus)
  })
  return totalPrice
}

export default calcPriceTotal