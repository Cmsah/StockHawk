const express = require('express');
const router = express.Router();
const render = require('../controllers/render');
const transaction = require('../controllers/transaction');
const path = require('path');
const {checkUserAuth} = require('../middleware/auth.middleware')

// route level middleware - to protect route
// router.use('/',checkUserAuth);

router.get('/delete/:id',checkUserAuth,transaction.deleteTransaction);
router.post('/',checkUserAuth,transaction.createTransaction);
router.get('/',checkUserAuth,transaction.getTransactions);
router.put('/',checkUserAuth,transaction.updateTransaction);
module.exports = router;