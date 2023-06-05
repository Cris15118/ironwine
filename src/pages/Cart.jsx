import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RingLoader } from "react-spinners";
import { getCartservice } from "../services/cart.services";

import CartProduct from "../components/CartProduct";

function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  
  }, []);




  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getCartservice();
      console.log(response.data);
      setProducts(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }

  return (
    <div>
    <h3>Carro de la compra</h3>
    {products.map((eachProduct,index)=>{
      return(
        <CartProduct key={index} cardProduct={eachProduct}/>
      )
    })}



    </div>
    

  );
}

export default Cart;
