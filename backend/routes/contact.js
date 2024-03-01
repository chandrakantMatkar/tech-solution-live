const express =  require('express');
const router =  express.Router();
const fetchUser = require('../middleware/fetchuser');
const contactsHandler = require('../controllers/contact')

router.post('/',contactsHandler.createContact );
router.get('/',fetchUser,contactsHandler.pendingContacts);
router.get('/all-contacts',fetchUser,contactsHandler.allContacts);

module.exports = router;