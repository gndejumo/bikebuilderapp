const express = require ('express')
const cors = require ('cors')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config();
// Modules routes importation
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const buildRoutes = require('./routes/buildRoutes')
const partRoutes = require('./routes/partRoutes')
const bikeRoutes = require('./routes/bikeRoutes')
const orderRoutes = require('/routes/orderRoutes')

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

// Register API end point
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/builds', buildRoutes)
app.use('/api/parts', partRoutes)
app.use('/api/bike', bikeRoutes)
app.use('/api/order', orderRoutes)


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('DB connected successfully')
    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`)
    })
}) .catch(err => console.log('DB connection:' ,err))







