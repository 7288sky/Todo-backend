import Task from "../Model/Task.Model.js";
import asyncHandler from "../Utils/asyncHandler.js";

// Create a new post
const createPost = asyncHandler(async (req, res) => {
    const { title, description,dueDate } = req.body;
    const user = req.user._id; // user Added in auth middleware
  
    try {
      const newPost = new Task({ title, description,dueDate, user });
      const savedPost = await newPost.save();
      res.status(201).json(savedPost);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  })
// get post by Id
  const getPostById = asyncHandler(async (req, res) => {
    try {
        const post = await Task.findOne({ _id: req.params.id, user: req.user._id });
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all posts for the logged-in user
const getAllPosts = asyncHandler(async (req, res) => {
    try {
        const posts = await Task.find({ user: req.user._id });
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a task by Id
const updateTask = asyncHandler(async (req, res) => {
    const { title, description, dueDate, status } = req.body;
    const user = req.user._id; // user added in auth middleware

    try {
        const task = await Task.findOne({ _id: req.params.id, user });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        task.title = title || task.title;
        task.description = description || task.description;
        task.dueDate = dueDate || task.dueDate;
        task.status = status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a task by ID
const deleteTask = asyncHandler(async (req, res) => {
    const user = req.user._id; // user added in auth middleware

    try {
        const task = await Task.findOne({ _id: req.params.id, user });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

         await task.deleteOne();
        res.json({ message: 'Task deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


  export {createPost,
        getPostById,
        getAllPosts,
        updateTask,
        deleteTask
         }