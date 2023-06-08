import { useContext, useEffect, useState } from "react";
import { getHistorialService } from "../services/historial.services";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import CardProducts from "../components/CardProducts"
import { CardGroup } from "react-bootstrap";
import { allwishListService } from "../services/wishlist.services";
import { AuthContext } from "../context/auth.context";
function Profile() {
  const [historial, setHistorial] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [wishlist,setWishlist]=useState([])
  const navigate = useNavigate();

  const {user} = useContext(AuthContext)
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await getHistorialService();
     
      setHistorial(response.data);

      const responseWL= await allwishListService()
      console.log("WL",responseWL.data)
      setWishlist(responseWL.data)
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  useEffect(() => {
    getData();
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
      <h1>Perfil de {user.user}</h1>
      <h3>Historial de compras</h3>
      <CardGroup>
      {historial.length>0&&historial.map((eachCompra) => {
        return <div key={eachCompra._id}>
        <CardProducts cardProduct={{name:eachCompra.productId.name,price:eachCompra.productId.price,image:eachCompra.productId.image,_id:eachCompra.productId._id}}/>
        </div>;
      })}
      </CardGroup>
      <h3>Lista de deseos</h3>
      <CardGroup>
      {wishlist.map((eachCompra) => {
        return <div key={eachCompra._id}>
        <CardProducts cardProduct={{name:eachCompra.name,price:eachCompra.price,image:eachCompra.image,_id:eachCompra._id}}/>
        </div>;
      })}
      </CardGroup> 
    </div>
    
  );
}

export default Profile;
