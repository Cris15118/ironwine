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
    {isLoggedIn && <Button onClick={handleLogout}>Cerrar sesion</Button>}
    {!isLoggedIn && <Link to={"/auth/signup"}>Registro</Link>}
     {!isLoggedIn && <Button onClick={handleLogin}><Link to={"/auth/login"}>Login</Link></Button>}
      

      

    </div>
  )
}

export default Navbar