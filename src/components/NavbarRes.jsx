import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ironWineImg from "../assets/ironwine.png";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function NavbarRes({ mostrarOcultarLogin }) {
  // pasamos funcion de mostrar/ocultar login
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser, user } = useContext(AuthContext);
  const [linkHome,setLinkHome]=useState("/") // depende del rol la pagina home
  const handleLogout = () => {
  
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };
  const handleLogin = () => {
    mostrarOcultarLogin();
  };

  useEffect(()=>{

    if(user)
    {
      switch(user.role) // depende del usuario te redirige a su pagina home
      {
        case "user": setLinkHome("/")
        break
        case "admin" : setLinkHome("/admin")
        break
        default : navigate("/")
        break
      }
    }
    
  },[])

  return (
    <div>
    
      <Link to={linkHome}>
       
        <img src={ironWineImg} alt="logo" width={80} />{" "}
      </Link>
      <Link to={linkHome}>Home</Link>
      {isLoggedIn && user.role === "user" && (
        <Link to={"/profile"}>Perfil</Link>
      )}
       
      {!isLoggedIn && <Button onClick={handleLogin}>Login/Signup</Button>}
      {isLoggedIn && user.role === "user" && <Link to={"/cart"}>Carrito</Link>}
      {isLoggedIn && user.role === "admin" && <Link to="/admin">Admin</Link>}
      {isLoggedIn && <Button onClick={handleLogout}>Cerrar sesion</Button>}


      <>
      {[ 'md'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href={linkHome}>Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                {isLoggedIn && user.role === "user" && <Nav.Link href={linkHome}>Home</Nav.Link>}
                  {isLoggedIn && user.role === "admin" &&   <Nav.Link href="/admin">Admin</Nav.Link>}
                 
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                 
                </Form>
                {isLoggedIn &&  <Nav.Link > <Button onClick={handleLogout} variant="outline-danger">Cerrar sesion</Button></Nav.Link>}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>


    </div>
  );
}

export default NavbarRes;
