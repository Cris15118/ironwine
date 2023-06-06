import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import ironWineImg from "../assets/ironwine.png";

function Navbar({ mostrarOcultarLogin }) {
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
    </div>
  );
}

export default Navbar;
