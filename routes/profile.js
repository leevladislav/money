const express = require('express');
const passport = require('passport');
const controller = require('../controllers/profile');
const router = express.Router();

// http://localhost/api/profile
router.get('/', passport.authenticate('jwt', {session: false}), controller.getProfile);

module.exports = router;
