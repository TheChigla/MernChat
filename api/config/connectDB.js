const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_URI)
    console.log(conn.connection.host.bgMagenta)
  } catch (err) {
    console.log(err.bgRed)
  }
}

module.exports = connectDB
