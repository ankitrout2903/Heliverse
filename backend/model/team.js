const mongoose = require('mongoose');
const User = require('./model');

const teamSchema = new mongoose.Schema({
  userIds: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ],
  teamID: { type: String, required: true },
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
