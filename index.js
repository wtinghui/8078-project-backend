const express= require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

//Routes
app.get('/',(req,res)=>{
    res.json({
        "message":"Test is successful"
    })
});


//import in the routes
const bookRoute = require('./routes/bookRoute');
const userRoute = require('./routes/userRoute');

//register the routes
app.use("/books", bookRoute);
app.use("/users", userRoute);

//Start server
app.listen(process.env.DB_PORT,()=>{
    console.log("Server has started succcessfully.")
});
