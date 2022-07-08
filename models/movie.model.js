const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    title: String,
    description: String,
    image: String,
    note: Number,
    vote: Number,
    date: String,
    adult: Boolean,
    popularity: Number,
    genre_ids: [Number],
    backdrop_path: String,
});
module.exports.movieModel = mongoose.model("Movies", movieSchema);
