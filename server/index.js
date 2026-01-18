const dotenv=require("dotenv");
const cors=require("cors");
dotenv.config();
const express=require("express");
app=express()
app.use(cors());
app.use(express.json());


port=process.env.PORT || 5000 ;
app.listen(port,()=>{
  console.log("listning on port..."+port)
})
