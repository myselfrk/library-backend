const express = require("express");
require("./dbConnect")();
const app = express();


app.get("/",(req,res)=>{
    res.send('begining of library backend api...')
})

const port  = process.env.PORT || 8080;
app.listen(port,()=>console.log(`live on ${port}...`));
