require('dotenv').config();
const express = require("express")
const mongoose = require("mongoose")
const url = 'mongodb://127.0.0.1:27017/CrudDB';
const authRoute = require("./Routes/auth.route"); 

const userRoute = require("./Routes/user.route")
const app = express();

//middleware
app.use(express.json());

//routes
app.use("/api/v1/auth", authRoute); 
app.use("/api/v1/users",userRoute);



mongoose.connect(url)

const con = mongoose.connection

con.on('open',()=>{
    console.log("connected...")
})

con.on('error', (err) => {
    console.error("Connection error:", err);
});


app.listen(3000,()=>{
    console.log("server is running.......")
})