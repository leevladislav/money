const express = require('express');
const passport = require('passport');
const controller = require('../controllers/expense');
const router = express.Router();

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryId);
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);

module.exports = router;
