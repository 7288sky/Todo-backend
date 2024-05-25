import express from "express";
import { createPost, deleteTask, getAllPosts, getPostById, updateTask } from "../Controllers/taskController.js";
import { authenticate } from "../Middlewares/authMiddleware.js";
const router=express.Router();

router.route('/createpost').post(authenticate,createPost);
router.route('/taskById/:id').get(authenticate,getPostById)
router.route('/allposts').get(authenticate,getAllPosts)
router.route('/updatetask/:id').put(authenticate,updateTask)
router.route('/deletetaskById/:id').delete(authenticate,deleteTask)
export default router;