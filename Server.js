const app = require("./index");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const mongose=require("mongoose");
const cors=require("cors");
dotenv.config({ path: "./config.env" });
app.use(cors());
mongose.connect(process.env.DB_URL)
        .then(()=>{
            console.log("DB connectes succesfully");
        })
        .catch((err)=>{
            console.log(err);
        });


app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
