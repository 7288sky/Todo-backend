import express from "express";
import { createUser,loginUser, logoutCurrentUser} from "../Controllers/userControllers.js";
import { authenticate } from "../Middlewares/authMiddleware.js";

const router=express.Router();
router.route('/').post(createUser);

router.route('/login').get(loginUser)

router.route('/logout').post(logoutCurrentUser)

export default router;