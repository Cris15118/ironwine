import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
function CardProducts(props) {
  const { name, image, price, _id } = props.cardProduct;
  return (
    <div>
      <Card style={{ width: "12rem" }}>
      <Link to={`/products/${_id}/details`}>
        <Card.Img variant="top" src={image} width={40} />
        
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>{price} €</Card.Text>
          </Card.Body>
        </Link>
      </Card>
    </div>
  );
}
export default CardProducts;
