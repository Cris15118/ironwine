import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { addCartService, pullCartService } from "../services/cart.services";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RingLoader } from "react-spinners";

function CartProducts(props) {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [productsDetails, setProductDetail] = useState({
    _id: props.cardProduct.productId._id,
    name: props.cardProduct.productId.name,
    image: props.cardProduct.productId.image,
    price: props.cardProduct.productId.price,
    quantity: props.cardProduct.quantity,
  });

  const handleRestarProducts = async () => {
    try {
      setIsLoading(true);
      const response = await pullCartService(props.cardProduct.productId._id); //! devuelve los datos en un array
      console.log(response)
      if (response.data) { // si no ha sido borrado
        setProductDetail({
          _id: response.data.productId._id,
          name: response.data.productId.name,
          image: response.data.productId.image,
          price: response.data.productId.price,
          quantity: response.data.quantity,
        });
      }
      else{
        setProductDetail(null)
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleSumarProducts = async () => {
    try {
      //setIsLoading(true);
      const response = await addCartService(props.cardProduct.productId._id); //! devuelve los datos en un array

      setProductDetail({
        _id: response.data.productId._id,
        name: response.data.productId.name,
        image: response.data.productId.image,
        price: response.data.productId.price,
        quantity: response.data.quantity,
      });

      //setIsLoading(false); cambiar a spinner propio del boton
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  return (
    <>
    {/* solo se renderizara si existe, para que cuando se borre desaparezca */}
     {productsDetails&& 
     <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={productsDetails.image} />
        <Card.Body>
          <Card.Title>{productsDetails.name} </Card.Title>
          <Card.Text>Precio : {productsDetails.price} €</Card.Text>
          <Card.Text>Cantidad :{productsDetails.quantity} </Card.Text>
          <Button onClick={handleRestarProducts} disabled={isLoading}>
            -
          </Button>
          <Button onClick={handleSumarProducts} disabled={isLoading}>
            +
          </Button>
        </Card.Body>
      </Card>}
    </>
  );
}
export default CartProducts;
