import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ironWineImg from "../assets/ironwine.png";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

function NavbarRes({ mostrarOcultarLogin }) {
  // pasamos funcion de mostrar/ocultar login
  const navigate = useNavigate();
  const { isLoggedIn, authenticateUser, user } = useContext(AuthContext);
  const [linkHome, setLinkHome] = useState("/"); // depende del rol la pagina home

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    authenticateUser();
    navigate("/");
  };
  const handleLogin = () => {
    mostrarOcultarLogin();
  };

  useEffect(() => {
    if (user) {
      switch (
        user.role // depende del usuario te redirige a su pagina home
      ) {
        case "user":
          setLinkHome("/");
          break;
        case "admin":
          setLinkHome("/admin");
          break;
        default:
          navigate("/");
          break;
      }
    }
  }, []);

  return (
 
      <>
      
          <Navbar key={"md"} expand={"md"} >
            <Container fluid>
           
                
                  <Navbar.Brand href={linkHome}>
                    <img
                     src={ironWineImg} alt="logo" width={60}
                     
                      className="d-inline-block align-top"
                      
                    />
                  </Navbar.Brand>
               
          
              <Navbar.Brand href={linkHome}>IRONWINE</Navbar.Brand>
              <Navbar.Toggle
                aria-controls={`offcanvasNavbar-expand-${"md"}`}
              />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${"md"}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                    Offcanvas
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    {((isLoggedIn && user.role !== "admin") || !isLoggedIn) && (
                      <Nav.Link as={Link} to={linkHome}>
                        Home
                      </Nav.Link>
                    )}
                    {!isLoggedIn && (
                      <Nav.Link as={Link}>
                        <Button onClick={handleLogin} variant="outline-primary">
                          Login/Signup
                        </Button>
                      </Nav.Link>
                    )}
                    {isLoggedIn && user.role === "admin" && (
                      <Nav.Link as={Link} to="/admin">
                        Admin
                      </Nav.Link>
                    )}
                    {isLoggedIn && user.role === "user" && (
                      <Nav.Link as={Link} to={"/profile"}>
                        Perfil
                      </Nav.Link>
                    )}
                    {isLoggedIn && user.role === "user" && (
                      <Nav.Link as={Link} to={"/cart"}>
                        Carrito
                      </Nav.Link>
                    )}
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

                  {isLoggedIn && (
                    <Nav.Link as={Link}>
                      <Button onClick={handleLogout} variant="outline-warning">
                        Cerrar sesion
                      </Button>
                    </Nav.Link>
                  )}
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        
      </>
   
  );
}

export default NavbarRes;
