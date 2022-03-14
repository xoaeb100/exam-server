//importing required files
const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  logout,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
} = require("../Controller/UserController");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

//Creating a user using POST : "/api/auth". Doesn't Required login. Also used express validator to validate the request
router.route("/registration").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/logout").get(logout);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

module.exports = router;
