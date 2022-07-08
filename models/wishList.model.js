const mongoose = require("mongoose");

const wishListSchema = new mongoose.Schema({
    title: String,
    image: String,
});
module.exports.wishlistModel = mongoose.model("Wishlists", wishListSchema);
