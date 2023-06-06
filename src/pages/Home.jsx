import {  useNavigate } from "react-router-dom"
import { useState } from "react"
import {RingLoader} from "react-spinners"
import {getProductsService, searchProductService} from "../services/products.services"
import { useEffect } from "react"
import CardProducts from "../components/CardProducts"
import ControlledCarousel from "../components/ControlledCarousel"
import CardGroup from 'react-bootstrap/CardGroup'
import Search from "../components/Search"

function Home() {
  const navigate = useNavigate
  const [allProducts, setAllProducts]= useState("")
  const [isLoading, setIsLoading]= useState(true)
  const [searchInput, setSearchInput]= useState("")
  const [filteredProducts, setFilteredProducts] = useState([])

   useEffect(()=>{
      getData()
    },[])

  const getData = async ()=>{
    try {
      const response = await getProductsService()
      setAllProducts(response.data)
      setFilteredProducts(response.data)
      setIsLoading(false)
          
    } catch (error) {
      navigate("/error")
      
    }
   
  }
  const searchWine = (search)=>{

  let newSearch =  allProducts.filter((eachProduct)=>{
    if(eachProduct.name.toLowerCase().includes(search)){
      return true
    }else{
      return false
    }
  })
  setFilteredProducts(newSearch)
  return newSearch
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
      <div>
            <Search searchWine = {searchWine}/>
          </div>
      <ControlledCarousel/>
      <CardGroup>
      {filteredProducts.map ((eachProduct)=>{
        return(
          
          <div key={eachProduct._id} >
            <CardProducts cardProduct = {eachProduct}/>
            
          </div>
          
        )
      })}
      </CardGroup>
      
    </div>
  )
}

export default Home