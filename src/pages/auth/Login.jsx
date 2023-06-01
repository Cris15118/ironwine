import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginService } from "../../services/auth.services";
import { AuthContext } from "../../context/auth.context";





function Login() {
  const {authenticateUser}=useContext(AuthContext)

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("")

  const handleEmailChange = (e)=>  setEmail(e.target.value)
  const handlePasswordChange=(e) => setPassword(e.target.value)

  const handleLogin = async (e)=>{
    e.preventDefault()
    try{
      const response =loginService({email,password})
      localStorage.setItem("authToken",response.data.authToken)
      await authenticateUser()
      navigate("/profile")

    }
    catch(err)
    {
      console.log(err)
      if(err.response.status ===400)
      {
        setErrorMessage(err.response.data.errorMessage)
      }
      else{
        
        navigate("/error")
      }

      
    }
  }


  return (
    <div>

    <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
        />

        <br />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
        />

        <br />
        {errorMessage && <p style={{color:"red"}}>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>


    </div>
  )
}

export default Login