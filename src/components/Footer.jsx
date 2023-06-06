
import ironWineImg from "../assets/ironwine.png";
import {Link} from "react-router-dom"
function Footer() {
  return (
    <div>
      <footer className="text-white py-4 bg-dark">
        <div className="container">
          <Link to="/" className= "col-12 col-md-3 d-flex aling-items-center justyfy-content-center" >
            <img src={ironWineImg} alt="logo" className="mx-2" width={100} />
          </Link>
          <ul className="col-12 col-md-3 list-unstyled">
            <li className="font-weight-bold mb-2">IRONWINE</li>
            <li className="text-center">Tu tienda de vinos online</li>
          </ul>
          <ul className="col-12 col-md-3 list-unstyled">
            <li className="font-weight-bold mb-2">ATENCIÓN AL CLIENTE</li>
            <li className="text-center">L-J 9 a 18 / V 9 a 15</li>
            <li className="text-center">tfno. 900 000 000</li>
            <li className="text-center">email info@ironwine.es</li>

          </ul>


        </div>
      </footer>
    </div>
  )
}

export default Footer