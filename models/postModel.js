const mongoose = require("mongoose");

// Blog model
const postSchema = new mongoose.Schema({
    title: {
        type: String, 
        require: [true, "Post must have a title"],
    },
    body: {
        type: String,
        required: [true, "Post must have a body"],
    },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;