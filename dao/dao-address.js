const mongoose = require('mongoose');

// Load Model
require('../models/Addresses');
const Addresses = mongoose.model('addresses');

var newModule = {
};

module.exports = newModule;