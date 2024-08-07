import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title: {
        type: "String",
     
    },
    discription: {
        type: "String",
     

    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
    }
});

export const Task = mongoose.model("Task", taskSchema)