const express = require('express');
const router = express.Router();
const UserController = require('../controller/controller');
const TeamController = require('../controller/teamController');

router.get('/api/filters', UserController.getAllFilters);

router.get('/api/users', UserController.getUserList);

router.get('/api/users/:id', UserController.getUserById);

router.post('/api/users', UserController.createUser);

router.put('/api/users/:id', UserController.updateUser);

router.delete('/api/users/:id', UserController.deleteUser);

router.get('/api/getUserList', UserController.getUserList);

router.post('/api/team', TeamController.createTeam);

router.get('/api/teams', TeamController.getAllTeams);

router.get('/api/team/:id', TeamController.getTeamById);

router.delete('/api/team/:id/:userId', TeamController.deleteUserFromTeam);

module.exports = router;
