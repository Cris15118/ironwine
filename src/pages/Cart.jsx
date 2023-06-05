import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RingLoader } from "react-spinners";
import { deleteCartService, getCartservice, getTotalCartService } from "../services/cart.services";

import CartProduct from "../components/CartProduct";
import { Button } from "react-bootstrap";
import PaymentIntent from "../components/payment/PaymentIntent";
import { Form } from "react-router-dom";
function Cart() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState();
  const navigate = useNavigate();
  const [showPaymentIntent, setShowPaymentIntent] = useState(false); // para pasarela de pago
  const [total, setTotal] = useState(0);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await getCartservice(); 
      const responseTotal=await getTotalCartService()     
      setProducts(response.data); 
      console.log(responseTotal.data)
      setTotal(responseTotal.data)     
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleVaciarCarrito = async () => {
    try {
      setIsLoading(true);
      const response = await deleteCartService(); // borrar todos los productos del carrito del usuario
      const responseTotal=await getTotalCartService()
      setProducts(response.data);
      setTotal(responseTotal)
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      navigate("/error");
    }
  };
 
  
  useEffect(() => {
    getData()
  }, []);

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
        return (
          <CartProduct
            key={index}
            cardProduct={eachProduct}
            getData={getData}
          />
        );
      })}

      {products.length > 0 && (
        <Button onClick={handleVaciarCarrito}>Vaciar Carrito</Button>
      )}
      {showPaymentIntent === false ? (
        <Button onClick={() => setShowPaymentIntent(true)}>Purchase</Button>
      ) : (
        <PaymentIntent price={total} />
      )}
           
        
        <input name="total" value={total} disabled />
      
    </div>
  );
}

export default Cart;
