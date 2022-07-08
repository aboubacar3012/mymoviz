import React, { useState, useEffect } from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import { Container, Row, Col } from "react-bootstrap/"
import Movie from "./components/Movie"
import Header from "./components/Header"
import { MovieModel } from "./models"
const App: React.FC = () => {
    const [movies, setMovies] = useState<MovieModel[]>([])
    const [moviesWishList, setMoviesWishList] = useState<MovieModel[]>([])
    const [moviesCount, setMoviesCount] = useState<number>(0)
    const [filter, setFilter] = useState<Object>({
        genre: "8",
        limit: "30",
        note: "9",
    })

    // const [limit, setLimit] = useState<number>(12)

    useEffect(() => {
        const loadMovieData = () => {
            fetch(`/api/movies`, {
                method: "GET",
                headers: {
                    "content-type": "application/json;charset=UTF-8",
                },
                // body: JSON.stringify(filter),
            })
                .then((res) => res.json())
                .then((result) => {
                    setMovies(result.movies)
                })
        }

        const loadWishListData = () => {
            fetch(`/api/wishlists`, {
                method: "GET",
                headers: {
                    "content-type": "application/json;charset=UTF-8",
                },
                // body: JSON.stringify(filter),
            })
                .then((res) => res.json())
                .then((result) => {
                    setMoviesWishList(result)
                })
        }
        loadMovieData()
        loadWishListData()
    }, [filter])

    const handleClickAddMovie = (title: string) => {
        const finded = movies.find((element) => element.title === title)
        const moviesWishListCopy = finded ? [...moviesWishList, finded] : [...moviesWishList]
        // setMoviesCount((prev) => (prev < moviesWishList.length ? prev + 1 : prev))
        setMoviesWishList(moviesWishListCopy)
        fetch(`/api/wishlists`, {
            method: "POST",
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(finded),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
            })
    }

    const handleClickDelMovie = (title: string) => {
        const deleted = moviesWishList.find((element) => element.title === title)
        const finded = moviesWishList.filter((element) => element.title !== title)
        const moviesWishListCopy = finded ? finded : [...moviesWishList]
        // setMoviesCount((prev) => (prev > 0 ? prev - 1 : prev))
        setMoviesWishList(moviesWishListCopy)
        fetch(`/api/wishlists`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json;charset=UTF-8",
            },
            body: JSON.stringify(deleted),
        })
            .then((res) => res.json())
            .then((result) => {
                console.log(result)
            })
    }
    // console.log(moviesWishList)
    // addMovieInWishListDatabase()
    return (
        <>
            <Header handleClickDelMovie={handleClickDelMovie} wishList={moviesWishList} />
            <Container>
                <Row>
                    {/* <Col sm={2}> */}
                    {/* <h1>Filtre</h1> */}
                    {/* 
                        <form>
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setFilter({ ...filter, ...{ date: e.target.value } })}>
                                <option selected>Annee de sortie ?</option>
                                <option value="2022-01-01">2022</option>
                                <option value="2021-01-01">2021</option>
                                <option value="2020-01-01">2020</option>
                                <option value="2019-01-01">2019</option>
                            </select>
                            <br />
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setFilter({ ...filter, ...{ genre: e.target.value } })}>
                                <option selected>Genre de film ?</option>
                                <option value="8">Action</option>
                                <option value="12">Aventure</option>
                                <option value="18">Drame</option>
                                <option value="14">Fantastique</option>
                                <option value="10749">Romance</option>
                                <option value="37">Western</option>
                                <option value="10752">Guerre</option>
                                <option value="53">Thriller</option>
                                <option value="878">Science-Fiction</option>
                            </select>
                            <br />
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setFilter({ ...filter, ...{ limit: e.target.value } })}>
                                <option selected>Nombre de film ?</option>
                                <option value="10">10</option>
                                <option value="30">30</option>
                                <option value="30">80</option>
                                <option value="80">150</option>
                            </select>
                            <br />
                            <select className="form-select" aria-label="Default select example" onChange={(e) => setFilter({ ...filter, ...{ note: e.target.value } })}>
                                <option selected>Nombre d'etoile ?</option>
                                <option value="9">9 ⭐⭐⭐⭐⭐⭐⭐⭐⭐</option>
                                <option value="8">8 ⭐⭐⭐⭐⭐⭐⭐⭐</option>
                                <option value="7">7 ⭐⭐⭐⭐⭐⭐⭐</option>
                                <option value="6">6 ⭐⭐⭐⭐⭐⭐</option>
                                <option value="5">5 ⭐⭐⭐⭐⭐</option>
                            </select>
                        </form> */}
                    {/* </Col> */}
                    <Col sm={12}>
                        <Row xs={1} sm={2} md={3}>
                            {movies.map((movie, index) => (
                                <Movie wishList={moviesWishList} handleClickDelMovie={handleClickDelMovie} handleClickAddMovie={handleClickAddMovie} movie={movie} key={index} />
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default App
