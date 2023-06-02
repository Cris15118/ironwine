import {Link} from "react-router-dom"

function CartProducts(props) {
  const {name, image, price, _id}= props.cardProduct
  return (
    <div>

    <img src={image} alt="vinos" width={200}/>
            <p>{price} <span>€</span> </p>
            <Link to={`/products/${_id}/details`}>{name}</Link>
    </div>
) 
} 
export default CartProducts