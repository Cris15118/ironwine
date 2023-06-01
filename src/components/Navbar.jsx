import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/auth.context"
import { useContext } from "react"



function Navbar() {
  const navigate = useNavigate()
  const {isLoggedIn, authenticateUser}= useContext(AuthContext)

  const handleLogout = ()=>{
    localStorage.removeItem("authToken")
    authenticateUser()
    navigate("/")
  }
  return (
    <div>

    {isLoggedIn && <Link to={"/profile"}>Perfil</Link> }
    {isLoggedIn && <button onClick={handleLogout}>Cerrar sesion</button>}
    {!isLoggedIn && <Link to={"/auth/signup"}>Registro</Link>}
     {!isLoggedIn && <Link to={"/auth/login"}>Login</Link>}
      

      

    </div>
  )
}

export default Navbar