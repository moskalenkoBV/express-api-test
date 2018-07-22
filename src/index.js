import express from 'express'
import path from 'path'

const app = express()

app.get('/api/products', (req, res) => {
  res.status(200).json({ api: 'works' })
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.listen(3000, () => { console.log('Back is up on 3000') })