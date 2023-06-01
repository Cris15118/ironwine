import { Link } from "react-router-dom"


function Navbar() {
  return (
    <div>
      <Link to={"/auth/signup"}>Registro</Link>
      <Link to={"/auth/login"}>Login</Link>

      

    </div>
  )
}

export default Navbar