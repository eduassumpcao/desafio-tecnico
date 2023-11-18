const express = require('express')
const bodyParser = require('body-parser');
const carRouter = require('./src/routes/car.route');
const driverRouter = require('./src/routes/driver.route')
const errorHandler = require('./src/middlewares/errorHandler');


const app = express()

const PORT = 3000

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/v1/cars", carRouter)
app.use("/api/v1/drivers", driverRouter)

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})
