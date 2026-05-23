import express from "express";

import {
  loginUser,
  getUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser
} from "../controllers/userController.js";

import {
  validateUser
} from "../middleware/validationMiddleware.js";

const router = express.Router();



// LOGIN
router.post(
  "/login",
  loginUser
);



// GET ALL USERS
router.get(
  "/",
  getUsers
);



// GET SINGLE USER
router.get(
  "/:id",
  getSingleUser
);



// ADD USER
router.post(
  "/",
  validateUser,
  addUser
);



// UPDATE USER
router.put(
  "/:id",
  validateUser,
  updateUser
);



// SOFT DELETE
router.delete(
  "/:id",
  deleteUser
);

export default router;