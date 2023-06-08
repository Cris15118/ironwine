import { useContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { detailProductService } from "../services/products.services";
import { RingLoader } from "react-spinners";
import {
  addWishListService,
  isInWishList,
} from "../services/wishlist.services";
import { addCartService } from "../services/cart.services";
import { Button } from "react-bootstrap";
import ToastMessage from "../components/ToastMessage";
import Comentario from "../components/Comentario";
import { AuthContext } from "../context/auth.context";
import { GlobalContext } from "../context/cart.context";

function ProductDetails() {
  const {  addProductCart } =    useContext(GlobalContext);

  const params = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const [productDetail, setProductDetail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isWishList, setIsWishList] = useState(false);
  //toasts
  const [showToast, setShowToast] = useState(false);
  const [showToastCart, setShowToastCart] = useState(false);

  const handleAddWish = async () => {
    try {
      await addWishListService(params.id);
      setShowToast(true);
      getIsInWishList()
    } catch (error) {
      navigate("/error");
    }
  };
  const handleAddCart = async () => {
    try {
      await addProductCart(params.id);
      setShowToastCart(true);
    } catch (error) {
      navigate("/error");
    }
  };

  const getIsInWishList = async () => {
    try {
      const isInWL = await isInWishList(params.id);
      if (isInWL) {
        setIsWishList(isInWL.data);
      }
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
    if (isLoggedIn) {
      getIsInWishList();
    }
  }, []);

  const getData = async () => {
    try {
      const response = await detailProductService(params.id);
      setProductDetail(response.data);
      setIsLoading(false);
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

  const { name, image, price, tipo, bodega, description } = productDetail;
  return (
    <div className="container-details">
     
      <h3>{name}</h3>
      <img src={image} alt="vino" width={300} />
      <p>
        {price} <span>€</span>{" "}
      </p>
      <p>{description}</p>
      <h6>{tipo}</h6>
      <h5>{bodega}</h5>
      <div  className="btn-añadir">
      {(isWishList || !isLoggedIn) ? (
        
        <Button style={{backgroundColor: "#857550", borderColor: "cornsilk"}} onClick={handleAddWish} disabled>
          Añadir a Lista de Deseos
        </Button>
      ) : (
        <Button onClick={handleAddWish}>Añadir a Lista de Deseos</Button>
      )}
          {isLoggedIn?<Button  onClick={handleAddCart}>Añadir a Carrito</Button>:<Button onClick={handleAddCart} disabled>Añadir a Carrito</Button>}
      </div>
      <Comentario />
      <ToastMessage
        setShow={setShowToast}
        bgColor={"#fff08b"}
        textColor={"black"}
        show={showToast}
        messageTitle={"Deseo añadido."}
        message={"Este producto se ha añadido a su Lista de Deseos"}
      />
      <ToastMessage
        setShow={setShowToastCart}
        bgColor={"blue"}
        textColor={"white"}
        show={showToastCart}
        messageTitle={"Añadido a Carrito."}
        message={"Este producto se ha añadido a su carrito"}
      />
    </div>
  );
}

export default ProductDetails;
