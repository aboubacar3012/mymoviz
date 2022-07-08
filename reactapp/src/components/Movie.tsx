import React, { useState, useEffect } from "react"
import { Card, Col, Badge, ButtonGroup, Button } from "react-bootstrap"
import { MovieModel } from "../models"
import { FcLike } from "react-icons/fc"
import { BiCameraMovie } from "react-icons/bi"
import { AiFillStar } from "react-icons/ai"
import { BsFillHeartFill } from "react-icons/bs"

interface props {
    movie: MovieModel
    handleClickAddMovie: (title: string) => void
    handleClickDelMovie: (title: string) => void
    wishList: MovieModel[]
}

const Movie: React.FC<props> = ({ movie, handleClickAddMovie, handleClickDelMovie, wishList }) => {
    const [like, setLike] = useState<Boolean>(wishList.find((elt) => elt.title === movie.title) ? true : false)
    const [view, setView] = useState<Boolean>(false)
    const [countWatchMovie, setCountWatchMovie] = useState<number>(Math.floor(Math.random() * 1000))
    const [myRatingMovie, setMyRatingMovie] = useState<number>(0)
    const [isRatingMovie, setIsRatingMovie] = useState<boolean>(false)

    const [rating] = useState<number>(movie.note)
    const [countRating] = useState(movie.vote)

    const handleLike = () => {
        const finded = wishList.find((elt) => elt.title === movie.title)
        if (finded === undefined) {
            setLike(true)
        } else {
            setLike(false)
        }
    }

    const handleView = () => setView((prevView) => !prevView)

    const handleCountWatchMovie = () => {
        setCountWatchMovie(countWatchMovie + 1)
        setView(true)
    }

    const handleAddMyRatingMovie = () => {
        setMyRatingMovie((prev) => (prev < 10 ? prev + 1 : prev))
        setIsRatingMovie(true)
    }
    const handleDelMyRatingMovie = () => {
        setMyRatingMovie((prev) => (prev > 0 ? prev - 1 : prev))
        setIsRatingMovie(true)
    }

    let totalNote = rating * countRating
    let totalVote = countRating

    const tabRating = []
    const tabAverage = []
    for (let i = 0; i < 10; i++) {
        let color = ""
        if (i < myRatingMovie) {
            color = "text-warning"
        }

        tabRating.push(<AiFillStar key={i} onClick={() => setMyRatingMovie(i + 1)} className={color} />)
    }

    if (isRatingMovie) {
        totalVote += 1
        totalNote += myRatingMovie
    }

    const avgTotal = Math.round(totalNote / totalVote)

    for (let i = 0; i < 10; i++) {
        let color = ""
        if (i < avgTotal) {
            color = "text-warning"
        }
        tabAverage.push(<AiFillStar key={i} className={color} />)
    }

    return (
        <>
            <Col style={{ marginTop: "10px", marginBottom: "10px" }}>
                <Card>
                    <Card.Img variant="top" src={movie.image} height="500px" data-bs-toggle="modal" data-bs-target="#exampleModal" />

                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>{/* <h3> Sortie le: {movie.date}</h3> */}</Card.Text>
                        <Card.Text
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                handleLike()
                                if (!like) {
                                    handleClickAddMovie(movie.title)
                                } else {
                                    handleClickDelMovie(movie.title)
                                }
                            }}
                        >
                            Like <BsFillHeartFill className={like ? "text-danger" : ""} />
                        </Card.Text>
                        <Card.Text>
                            Nombre de vue <BiCameraMovie onClick={() => handleView()} className={view && "text-danger"} />{" "}
                            <Badge bg="secondary" onClick={handleCountWatchMovie}>
                                {countWatchMovie}
                            </Badge>
                        </Card.Text>
                        <Card.Text>
                            Mon avis
                            {tabRating}
                            <ButtonGroup size="sm">
                                <Button variant="dark" onClick={() => handleDelMyRatingMovie()}>
                                    -1
                                </Button>
                                <Button variant="warning" onClick={() => handleAddMyRatingMovie()}>
                                    +1
                                </Button>
                            </ButtonGroup>
                        </Card.Text>
                        <Card.Text>
                            Moyenne {tabAverage} ({totalVote})
                        </Card.Text>
                        <Card.Text>{movie.description.slice(0, 140)} ....</Card.Text>
                    </Card.Body>
                </Card>
                {/* <!-- Modal --> */}
                {/* <div className="modal  fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {movie.title}
                            </h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">...</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                                Close
                            </button>
                            <button type="button" className="btn btn-primary">
                                Save changes
                            </button>
                        </div>
                    </div>
                </div>
            </div> */}
            </Col>
        </>
    )
}

export default Movie
