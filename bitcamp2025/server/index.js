const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// the thing that connects to the mongodb database
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// create user schema
const userSchema = new mongoose.Schema({
  id: String,
  username: String,
  password: String,
  name: String,
  type: String,
  userInfo: Object
});
const UserModel = mongoose.model('users', userSchema);


app.get("/getUsers", async(req,res) => {
    try {
        const userData = await UserModel.find();
        res.json(userData); 
        console.log(userData);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
});

app.get("/getUsers/:username", async(req,res) => {
    try {
        const user = await UserModel.findOne({ username: req.params.username });
        if (!user) {
        return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/postUser', async (req, res) => {
  try {
    const { id, username, password, name, type, userInfo } = req.body;

    const newUser = new UserModel({
      id,          // UUID from the request body
      username,    // The username from the request body
      password,    // The password from the request body
      name,        // The name should be a string (like 'username' or another string)
      type,        // Type (e.g., 'therapist' or 'client')
      userInfo,    // User information object (e.g., email)
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

  




// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
