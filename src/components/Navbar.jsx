import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { useContext } from "react"
import Button from 'react-bootstrap/Button';
import ironWineImg from "../assets/ironwine.png"



function Navbar({mostrarOcultarLogin}) { // pasamos funcion de mostrar/ocultar login
  const navigate = useNavigate()
  const {isLoggedIn, authenticateUser}= useContext(AuthContext)

  const handleLogout = ()=>{
    localStorage.removeItem("authToken")
    authenticateUser()
    navigate("/")
  }
  const handleLogin =()=>{
    mostrarOcultarLogin()
  }
  return (
    <div>

    <Link to={"/"}> <img src={ironWineImg} alt="logo" width={80} /> </Link>
    {isLoggedIn && <Link to={"/profile"}>Perfil</Link> }
  
     {!isLoggedIn && <Link to={"/auth/signup"} >Registro</Link>} {/* mostrarOcultarLogin para poder cerrarlo al loguearte */}    
     {!isLoggedIn && <Button onClick={handleLogin} >Login</Button>}
     {isLoggedIn && <Link to={"/cart"}>Carrito</Link> }
     {isLoggedIn && <Button onClick={handleLogout}>Cerrar sesion</Button>}
      

      

    </div>
  )
}

export default Navbar