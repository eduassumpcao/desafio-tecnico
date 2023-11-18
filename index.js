const express = require('express')
const bodyParser = require('body-parser');
const carRouter = require('./src/routes/car.route')


const app = express()

const PORT = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/v1/cars", carRouter)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
