const router = require('express')();
const user = require('./v1/user');
const userLevel = require('./v1/userLevel');
const level = require('./v1/level');
const category = require('./v1/category');
const challenge = require('./v1/challenge');

router.use('/user', user);
router.use('/user-level', userLevel);
router.use('/level', level);
router.use('/category', category);
router.use('/challenge', challenge);

module.exports = router;