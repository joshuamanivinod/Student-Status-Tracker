const express=require("express");
const cors=require("cors")
const router=require("./Routes/router")
require("dotenv").config(); 
require("./db/conn")


const app=express();
const PORT=process.env.PORT||6010
app.use(cors())  //middleware 
app.use(express.json())
app.use(router)
app.use("/uploads",express.static("./uploads"))
app.use("/files",express.static("./public/files"))

app.listen(PORT,()=>{
    console.log(`server running on port no. ${PORT}`);
})