import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RingLoader } from "react-spinners";
import { deleteCartService, getCartservice } from "../services/cart.services";

import CartProduct from "../components/CartProduct";
import { Button } from "react-bootstrap";

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

  const handleVaciarCarrito = async () => {
    try {
      setIsLoading(true);
      const response=await deleteCartService(); // borrar todos los productos del carrito del usuario
      setProducts(response.data);
      setIsLoading(false);
      navigate("/")
    } catch (error) {
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
      {products.map((eachProduct, index) => {
        return <CartProduct key={index} cardProduct={eachProduct} />;
      })}

      {products.length>0&&<Button onClick={handleVaciarCarrito}>Vaciar Carrito</Button>}
    </div>
  );
}

export default Cart;
