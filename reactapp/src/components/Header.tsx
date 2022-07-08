import React from "react"
import Container from "react-bootstrap/Container"
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import NavDropdown from "react-bootstrap/NavDropdown"
import { MovieModel } from "../models"

interface props {
    wishList: MovieModel[]
    handleClickDelMovie: (title: string) => void
}

const Header: React.FC<props> = ({ wishList, handleClickDelMovie }) => {
    return (
        <Navbar bg="dark" variant="dark" sticky="top" expand="md">
            <Container>
                <Navbar.Brand href="#home">
                    <img alt="" src="./img/logo.png" width="30" height="30" className="d-inline-block align-top rounded " /> MyMoviz
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {/* <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link> */}
                        <NavDropdown title={`Wishlist (${wishList.length} Films)`} id="basic-nav-dropdown">
                            {wishList.map((element, index) => (
                                <NavDropdown.Item onClick={() => handleClickDelMovie(element.title)} key={index} href="#action/3.1" className="d-flex justify-content-between">
                                    <p>
                                        <img src={element.image} alt="" width="50px" className="rounded" />
                                    </p>
                                    &nbsp;
                                    <p>{element.title}</p>
                                </NavDropdown.Item>
                            ))}
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
