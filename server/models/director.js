import mongoose from "mongoose";

const directorSchema = mongoose.Schema({
    name: String,
    age: Number
})

export default mongoose.model('directors', directorSchema)