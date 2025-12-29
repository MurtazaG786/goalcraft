const express=require("express")
app=express()
app.get("/",(req,res)=>{
  res.send("server is working")
})
const port=5000
app.listen(port,()=>{
  console.log("listning on port..."+port)
})