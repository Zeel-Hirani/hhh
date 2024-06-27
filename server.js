const express = require('express');
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv');
const connectDb = require('./config/db');


dotenv.config()

connectDb();

const app = express()


app.use(cors())
app.use(express.json());
app.use(morgan('dev'));


app.use('/api',require('./routes/testRoutes'));
app.use('/api/auth',require("./routes/authRoutes"));
app.use('/api/auth',require("./routes/userRoutes"));
app.use('/api/auth',require("./routes/resturantRoutes"));
app.use('/api/category',require("./routes/categoryRoutes"));
app.use('/api/food',require('./routes/foodRoutes'))
app.get("/",(req,res)=>{
     res.status(200).send("welcomme mto food server api")
});

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=>{
    console.log(`node server running start on ${PORT}` .white.bgCyan);
})