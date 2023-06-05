import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
function CartProducts(props) {
  const { name, image, price, _id } = props.cardProduct;
  return (
    <div>
      <Link to={`/products/${_id}/details`}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={image} />
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>{price}</Card.Text>
        </Card.Body>
      </Card>
      </Link>
    </div>
  );
}
export default CartProducts;
