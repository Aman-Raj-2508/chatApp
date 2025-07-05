const express = require('express');


const router = express.Router();

const { sendMessage, getMessages } = require('../controllers/messageController');
const secureRoute = require('../middleware/secureRoute');



router.post("/send/:id", secureRoute, sendMessage); //here we will pass the receivers id in the url
router.get("/get/:id", secureRoute, getMessages);

module.exports = router;