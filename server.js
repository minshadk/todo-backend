// Import required modules
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config({ path: './.env' })

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(
      'Connected to the database and running on port',
      process.env.PORT,
    )
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })

  const port = process.env.PORT || 8001

  app.listen(port, () => {
    console.log(`App running on port ${port}`)
  })
  