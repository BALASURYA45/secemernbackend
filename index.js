const express = require('express');
const path = require('path');
const mdb = require('mongoose');
const dotenv = require('dotenv');
const Signup = require("./models/signupSchema");
const app = express();
dotenv.config();
app.use(express.json());
mdb.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB Connection Successful");
  })
  .catch((err) => {
    console.log("MongoDb connection unsuccessful", err);
  });
app.get('/', (req, res) => {
  res.send("Welcome to Backend Deploly");
});
app.get('/static', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});
app.post('/signup',(req, res) => {
  var { firstname, lastname, username, email, password } = req.body;
  try {
    console.log("inside try");
    const newCustomer = new Signup({
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      password: password,
    });
    console.log(newCustomer);
    newCustomer.save();
    res.status(201).send("Signup successful");
  } catch (err) {
    res.status(400).send("Signup unsuccessful", err);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
      const user = await Signup.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }
      const user_password=user.password;
      if (password!=user_password) {
          return res.status(401).json({ message: "Invalid password" });
      }
      
      res.status(200).json({ message: "Login successful", user });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
});
app.listen(3001,()=>{
  console.log("server is started");

});