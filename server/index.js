const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const {connection} = require('./config/db')
const authRoutes = require('./routes/Auth')
const ProdRoutes = require('./routes/Prod')
const PORT = 7000;
connection()

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}))
app.use(express.json())
app.use("/api/auth",authRoutes)
app.use('/api/Prod',ProdRoutes);
app.listen(PORT,()=> {
    console.log(`APP is running on ${PORT}`);
})