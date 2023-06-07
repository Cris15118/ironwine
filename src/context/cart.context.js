import { createContext,  useEffect, useState } from "react";
import {
  addCartService,
  getCartservice,
  pullCartService,
  deleteCartService
} from "../services/cart.services";

const GlobalContext = createContext();

function GlobalWrapper(props) {
  const [productsCart, setProductsCart] = useState();
  const [totalProductsCart,setTotalProductsCart]=useState(0)
 
  const getCartProducts = async () => {
    try {
        const response =await getCartservice()
        setProductsCart( response.data) // actualiza los productos
        console.log("setTotalProductsCart",response.data.length)
        setTotalProductsCart(response.data.length)
        return response.data
    } catch (error) {
      console.log(error);
    }    
  };
  const addProductCart = async (productId) => {
    try {
      const response=await addCartService(productId);
      await getCartProducts() // vuelve a cargar los productos
      return response
    } catch (error) {
      console.log(error);
    }
  };
  const removeProductCart = async (productId) => {
    try {
      const response=await pullCartService(productId);
      await getCartProducts()
      return response
    } catch (error) {
      console.log(error);
    }
  };
  const emptyCart =async () =>{
    try {
        const response= await deleteCartService()
         await getCartProducts()
         return response

    } catch (error) {
        console.log(error)
    }
   
  }


  
  useEffect(() => {
    getCartProducts() //inicializa los productos del carrito del usuario
  }, [])

  return (
    <GlobalContext.Provider
      value={{ productsCart, addProductCart, removeProductCart, getCartProducts ,emptyCart,totalProductsCart}}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}
export { GlobalWrapper, GlobalContext };
