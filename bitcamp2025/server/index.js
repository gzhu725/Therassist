const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// the thing that connects to the mongodb database
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
.connect(process.env.MONGO_URI, 
    {
    useNewUrlParser: true,
    useUnifiedTopology: true
    })
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// create user schema
const userSchema = new mongoose.Schema({
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
      const newUser = new UserModel({ name: req.body });
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
