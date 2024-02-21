import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  user_id: String,
  user_name: String,
  message: String,
  selectedFile: String,
  filter: String,
  likeCount: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  department: String,
});

const PostMessage = mongoose.model("PostMessage", postSchema);

export default PostMessage;
