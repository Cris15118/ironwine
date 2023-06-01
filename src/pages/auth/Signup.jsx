import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { signupService}from "../../services/auth.services"


function Signup() {
  const navigate = useNavigate()

  const [username, setUsername]= useState("")
  const [email, setEmail] = useState ("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage]= useState("")

  const handleUsernameChange = (event)=>setUsername(event.target.value)
  const handleEmailChange = (event)=> setEmail(event.target.value)
  const handlePasswordChange = (event)=> setPassword(event.target.value)

  const handleSignup= async(event)=>{
    event.preventDefault()

    try {
      const user = {username, email, password}
      await signupService(user)
      navigate("auth/login")
      
    } catch (err) {
      if(err.response.status === 400){
        setErrorMessage(err.response.data.errorMessage)
      }else{
        navigate("/error")
      }
      
    }
  }
  return (
    <div>
      <h1>Sign Up</h1>
    
    <form onSubmit={handleSignup}>
      
      <label>Username:</label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={handleUsernameChange}
      />

      <br />

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

      {errorMessage && <p style={{color: "red"}}>{errorMessage}</p>}

      <button type="submit">Signup</button>
    </form>

    </div>
  )
}

export default Signup