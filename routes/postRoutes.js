const express = require("express");
const postController = require("../controllers/postController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();
router
    .route("/")
    .get(postController.getAllPosts)
    .post(protect, postController.createPost); // Run our middleware function to verify the user is logged in. 
                                               //If user is logged in the next() method is called and will go to postController.createPost.

router
    .route("/:id")
    .get(postController.getOnePost)
    .patch(protect, postController.updatePost)
    .delete(protect, postController.deletePost);

module.exports = router;