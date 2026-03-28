const express = require ('express');
const cors = require ('cors');
require('dotenv').config();

const app = express();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.get("/",(req,res)=>{
    res.json({message:"Test success"})
})


//import routes
const bookRoutes = require('./routes/bookRoute');

app.use('/books', bookRoutes);


const port = process.env.PORT;
app.listen(port,()=>{
    console.log("Server has started successfully")
});