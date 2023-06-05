import {  useNavigate } from "react-router-dom"
import { useState } from "react"
import {RingLoader} from "react-spinners"
import {getProductsService} from "../../services/products.services"
import { useEffect } from "react"
import CardProducts from "../../components/CardProducts"
import { Link } from "react-router-dom"


function AdminHome() {
  const navigate = useNavigate
  const [allProducts, setAllProducts]= useState("")
  const [isLoading, setIsLoading]= useState(true)

   useEffect(()=>{
      getData()
    },[])

  const getData = async ()=>{
    try {
      const response = await getProductsService()
      setAllProducts(response.data)
      setIsLoading(false)
          
    } catch (error) {
      navigate("/error")
      
    }
   
  }
  if(isLoading){
    return(
      <div className="spinner">
          <RingLoader />
        </div>
    )
  }

  return (
    <div>
      <h1>AQUI ESTA TU CASA</h1>
      {allProducts.map ((eachProduct)=>{
        return(
          
          <div key={eachProduct._id} >
            <CardProducts cardProduct = {eachProduct}/>
            <Link to={`/admin/${eachProduct._id}/edit`} >Editar</Link>
          </div>
        )
      })}
    </div>
  )
}

export default AdminHome