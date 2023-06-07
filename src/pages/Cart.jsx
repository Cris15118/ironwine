import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router";
import { RingLoader } from "react-spinners";
import { GlobalContext } from "../context/cart.context.js";
import CartProduct from "../components/CartProduct";
import { Button } from "react-bootstrap";
import ModalPago from "../components/payment/ModalPago";
function Cart() {
  //cart context

  const { productsCart, emptyCart, totalProductsCart } =
    useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false); // comienza cargado de context
  const navigate = useNavigate();
  const [total, setTotal] = useState(0);
  const [modalShow, setModalShow] = useState(false); // mostrar pasarela

  const handleVaciarCarrito = async () => {
    try {
      setIsLoading(true);
      await emptyCart(); // borrar todos los productos del carrito del usuario

      setTotal(productsCart);
      setIsLoading(false);
      navigate("/");
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
      <div className="grid-products">
        {productsCart.map((eachProduct, index) => {
          return <CartProduct key={index} cardProduct={eachProduct} />;
        })}
      </div>
      <div className="btn-pagar">
        {productsCart.length > 0 && (
          <Button onClick={handleVaciarCarrito}>Vaciar Carrito</Button>
        )}

        {productsCart.length > 0 ? (
          <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
              Pagar ahora
            </Button>
            <ModalPago
              price={total}
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </>
        ):<h4>El carrito está vacío</h4>}

        <input
          style={{ textAlign: "center", width: "100px" }}
          name="total"
          value={total}
          disabled
        />
      </div>
    </div>
  );
}

export default Cart;
