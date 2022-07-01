import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
    name: String,
    genre: String,
    directorId: String,
})

export default mongoose.model('movies', movieSchema)