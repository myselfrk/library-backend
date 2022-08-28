const config = require("config");
const { default: mongoose } = require("mongoose");

module.exports=()=>{
    mongoose.connect(config.get('mongoDB-url'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongodb..."))
  .catch((ex) => console.log("Failed to connect with mongodb"));
}