const Team = require('../model/team');

const createTeam = async (req, res) => {
  try {
    const userId = req.body.userId;
    const teamID = req.body.teamId;

    if (!userId) {
      return res
        .status(400)
        .json({ message: 'Please provide a valid user ID.' });
    }

    let team = await Team.findOne({ teamID });

    if (team) {
      team.userIds.push(userId);
    } else {
      const selectedUser = await User.findById(userId);

      if (!selectedUser) {
        return res.status(404).json({ message: 'User not found.' });
      }

      const uniqueDomains = new Set([selectedUser.domain]);
      const uniqueAvailability = new Set([selectedUser.available]);

      if (uniqueDomains.size !== 1 || uniqueAvailability.size !== 1) {
        return res.status(400).json({
          message: 'Selected user must have a unique domain and availability.',
        });
      }

      team = new Team({ userIds: [userId], teamID });
    }

    await team.save();

    res.status(201).json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllTeams = async (req, res) => {
  try {
    const { page = 1, limit = 16 } = req.query;
    const teams = await Team.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.json(teams);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteUserFromTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }
    const userId = req.params.userId;
    const index = team.userIds.indexOf(userId);
    if (index > -1) {
      team.userIds.splice(index, 1);
    }
    await team.save();
    res.json(team);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  createTeam,
  getTeamById,
  getAllTeams,
  deleteUserFromTeam,
};
