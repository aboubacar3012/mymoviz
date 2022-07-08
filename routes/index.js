var express = require("express");
var router = express.Router();
var request = require("sync-request");

const { movieModel } = require("../models/movie.model");
const { wishlistModel } = require("../models/wishList.model");

router.post("/api/wishlists/", async function (req, res) {
    const finded = await wishlistModel.findOne({ title: req.body.title });
    if (!finded) {
        const newWishList = new wishlistModel({
            title: req.body.title,
            image: req.body.image,
        });
        const saved = await newWishList.save();
        res.send(saved);
    }
    res.end();
});

router.delete("/api/wishlists", async function (req, res) {
    const deleted = await wishlistModel.findOneAndDelete({ title: req.body.title });
    if (!deleted) {
        return res.json({ success: false, message: "Une erreur s'est produite, Le film n'a pas ete suprrime" });
    }
    res.json({ success: true, deleted: deleted });
});

router.get("/api/wishlists", async function (req, res) {
    const wishLists = await wishlistModel.find({});
    if (!wishLists) {
        res.json({ success: false, message: "Une erreur s'est produite, Aucun films n'a ete trouve" });
    }
    res.json(wishLists);
});

/* Get all movies */
router.get("/api/movies/", async function (req, res) {
    const params = req.body;
    const filter = { note: { $gte: params.note ? parseFloat(params.note) : 0 }, genre_ids: { $in: [params.genre] } };
    const movies = await movieModel.find(filter).limit(params.limit ? parseInt(params.limit) : 0);
    if (!movies) {
        res.json({ success: false, message: "Une erreur s'est produite, Aucun films n'a ete trouve" });
    }
    res.json({ movies });
    // res.json(req.body);
});

/* Poste movies page. */
router.post("/api/movies/add", function (req, res, next) {
    let moviesList = [];
    // res.render('index', { title: 'Express' });
    for (let i = 1; i <= 10; i++) {
        const dataAPI = request(
            "GET",
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.api_key}&language=fr-FR&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&release_date.gte=2021-01-01&with_watch_monetization_types=flatrate`
        );
        const result = JSON.parse(dataAPI.body);
        const resultats = result.results;
        moviesList.push(resultats);
    }
    moviesList = moviesList.flat();
    moviesList.forEach(async (element, index) => {
        const newMovie = new movieModel({
            title: element.original_title,
            description: element.overview,
            image: `https://image.tmdb.org/t/p/w500/${element.poster_path}`,
            note: element.vote_average,
            vote: element.vote_count,
            date: element.release_date,
            adult: element.adult,
            popularity: element.popularity,
            genre_ids: element.genre_ids,
            backdrop_path: `https://image.tmdb.org/t/p/w500/${element.backdrop_path}`,
        });
        await newMovie.save();
    });
    res.json();
});

router.delete("/api/movies/:id", async function (req, res) {
    const deleted = await movieModel.findByIdAndDelete(req.params.id);
    if (!deleted) {
        res.json({ success: false, message: "Une erreur s'est produite, Le film n'a pas ete suprrime" });
    }
    res.json({ success: true, deleted: deleted });
});

module.exports = router;
