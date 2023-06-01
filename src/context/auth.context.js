import { createContext, useEffect, useState } from "react";
import { verifyService } from "../services/auth.services";
import {RingLoader} from "react-spinners"

const AuthContext = createContext()

function AuthWrapper(props) {

    // 1. los estados o funciones a exportar
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)
    const [ user, setUser ] = useState(null)
    const [ isLoading, setIsLoading ] = useState(true)
  
    useEffect(() => {
      authenticateUser()
    }, [])
  
   
    const authenticateUser = async () => {
  
      try {
        
        const response = await verifyService()
       
        if(response) // si no esta logueado
        {
          console.log("token validado")
          setIsLoggedIn(true)
          setUser(response.data.payload)
          setIsLoading(false)
        }
        
  
      } catch (error) {
        console.log("token invalido o no hay token")
        console.log(error)
        setIsLoggedIn(false)
        setUser(null)
        setIsLoading(false)
      }
  
    }
  
    const passedContext = {
      isLoggedIn,
      user,
      authenticateUser
    }
  
    if (isLoading) {
      return (
        <div className="spinner">
          <RingLoader />
        </div>
      )
    }
  
    // la renderización de la App con el contexto
    return (
      <AuthContext.Provider value={passedContext}>
        {props.children}
      </AuthContext.Provider>
    )
  }
  
  export {
    AuthContext,
    AuthWrapper
  }