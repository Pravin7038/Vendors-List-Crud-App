const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();
require("dotenv").config();
const VendorRoute = require("./routes/vendorRoutes")
const cors = require("cors");
app.use(cors());
app.use(express.json());
app.use("/vendors",VendorRoute);


app.get("/",(req,res)=>{

    try {
        
    } catch (error) {
        
        res.send({msg:error})
    }
})
const connect = async () => {

    try {

        await mongoose.connect(process.env.URL)

        console.log("connected")

    } catch (error) {

        console.log(error)
    }
}

app.listen(8080, () => {

    connect()
    console.log("listening");
})