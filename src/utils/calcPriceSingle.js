const calcPriceSingle = (price, amount, bonus) => (
  bonus === null ? price * amount : (price + (price * bonus.value)) * amount
)

export default calcPriceSingle