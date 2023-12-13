// import express from "express";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
const PORT = process.env.PORT || 3000;
// app.use(bodyParser.json);


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/signupform', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a user schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);



// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Handle the form submission
app.post('/signup', (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user in MongoDB
  const newUser = new User({
    username,
    email,
    password
  });

  newUser.save()
    .then(() => {
      // Redirect to the success page
      res.send("success!!!");
    })
    .catch(err => {
      res.send('Error occurred while signing up.');
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
