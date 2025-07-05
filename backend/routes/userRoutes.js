const express = require('express');
const router = express.Router();

const { signUp, login, logout, allUsers } = require('../controllers/userController');
const secureRoute = require('../middleware/secureRoute');

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', logout);
router.get('/allusers', secureRoute, allUsers);

module.exports = router;
