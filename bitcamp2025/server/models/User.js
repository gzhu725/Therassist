const mongoose = require('mongoose');

// makes name required, ignores any other fields
// basically structures the nosql data from mongodb
const userSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
