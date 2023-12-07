const User = require('../model/model');

const getAllFilters = async (req, res) => {
  try {
    const users = await User.find();

    const getUniqueValues = (data, key) => {
      const uniqueValues = new Set(data.map((item) => item[key]));
      return Array.from(uniqueValues);
    };

    const genders = getUniqueValues(users, 'gender');
    const domains = getUniqueValues(users, 'domain');

    const filters = {
      genders,
      domains,
    };

    res.json(filters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 16 } = req.query;
    const users = await User.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getUserList = async (req, res) => {
  try {
    const {
      searchQuery = '',
      gender = '',
      domain = '',
      available = '',
      page = 1,
      limit = 16,
    } = req.query;

    const query = {};
    if (searchQuery) {
      query.$or = [
        { first_name: { $regex: new RegExp(`^${searchQuery}`, 'i') } },
        { last_name: { $regex: new RegExp(`^${searchQuery}`, 'i') } },
      ];
    }
    if (gender) {
      query.gender = gender;
    }
    if (domain) {
      query.domain = domain;
    }
    if (available !== undefined && available !== '') {
      query.available = available === 'true' ? true : false;
    }

    const totalUserCount = await User.countDocuments(query);

    const userList = await User.find(query)
      .sort({ first_name: 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const maxPage = Math.ceil(totalUserCount / limit);

    res.json({ userList, maxPage });
  } catch (error) {
    console.error('Error fetching user list:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getAllFilters,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserList,
};
