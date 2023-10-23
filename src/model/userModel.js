const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true,"Username is taken by other!"],
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  tweets:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'Tweet'
  }],
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // You can store the image URL here
  },
  followers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  following: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
