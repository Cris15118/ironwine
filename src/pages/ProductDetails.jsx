
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { detailProductService } from "../services/products.services"
import { RingLoader } from "react-spinners"
import {addWishListService}from "../services/wishlist.services"
import {addCartService} from "../services/cart.services"
import { Button } from "react-bootstrap"


function ProductDetails() {
  const params = useParams()
  const navigate = useNavigate()

  const [productDetail, setProductDetail]= useState("")
  const [isLoading, setIsLoading]= useState(true)


  const handleAddWish = async( )=>{
    try {
     await  addWishListService(params.id )
    console.log("click")
    } catch (error) {
      navigate("/error")
    }
   
  }
  const handleAddCart = async ()=>{
    try {
      await addCartService(params.id)
      console.log("click carrito")
      
    } catch (error) {
      navigate("/error")
    }
  }

  useEffect(()=>{
    getData()
  },[])

  const getData= async ()=>{
    try {
      const response = await detailProductService(params.id)
      setProductDetail(response.data)
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

  const {name, image, price, tipo, bodega, description}= productDetail
  return (
    <div>
      <h3>{name}</h3>
      <img src= {image} alt="vino" width={300} />
      <p>{price} <span>€</span> </p>
      <p>{description}</p>
      <h6>{tipo}</h6>
      <h5>{bodega}</h5>
    <Button onClick={handleAddWish}>AÑADIR FAVORITOS</Button>
   
    <Button onClick={handleAddCart}>COMPRAR</Button>

    </div>
  )
}

export default ProductDetails