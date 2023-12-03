import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: String,
    required: [true, "Cannot create a task without userId"],
  },
  done: {
    type: Boolean,
    default: false,
  },
  createdOn: {
    type: Date,
    default: Date.now,
    required: [true, "Need the creation date and time"],
  },
  dueBy: {
    type: Date,
    required: [true, "Need a completion date for a task"],
  },
});

const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);

export default Task;
