const express = require('express');
const { userController } = require('../controllers');
const authenticate = require('../middlewares/authenticate');
const router = express.Router();

router
  .route('/signup')
  .post(userController.signup);

router
  .route('/login')
  .post(userController.login);

router
  .route('/logout')
  .post(userController.logout);

router
  .route('/get')
  .get( userController.getUserDetails);
module.exports = router;