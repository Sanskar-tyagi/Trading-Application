const express = require("express");
const mongoose = require("mongoose")
const cors = require("cors");
require('dotenv').config()

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose.connect("mongodb+srv://sanskar:sanskar123@cluster0.9bc3rq9.mongodb.net/?retryWrites=true&w=majority",
    {
        useNewUrlParser: true, useUnifiedTopology: true
    }, () => {
        console.log("Your DB is connected.");
    }
)

const userSchema = new mongoose.Schema({
    userName: { type:String },
    email: {type:String},
    money: {type:Number, default:10000}
})

const User = new mongoose.model("users", userSchema);
app.post('/saveDetails', (req, res) => {
    const {userName, email} = req.body;
    const user = new User({
        userName,
        email
    });
    user.save(err => {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send({message: "Successfully Registered, Please login now!"});
        }
    });
});
app.post('/getUserBalance', async (req, res) => {
    const { username } = req.body;
  
    try {
      const user = await users.findOne({ username }); // assuming your user model is named 'User'
      res.json({ balance: user.balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

app.get("/", (req,res) => {
    res.send("Hello Ujjwal")
})
app.listen(8080,() => {
    console.log("Backend Started");
});