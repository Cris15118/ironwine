import "bootstrap/dist/css/bootstrap.min.css";

import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";
import NavBar from "./components/Navbar";
import IsPrivate from "./components/auth/IsPrivate";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Payment from "./pages/Payment";
import ProductDetails from "./pages/ProductDetails";
import AdminHome from "./pages/admin/AdminHome";
import AdminEdit from "./pages/admin/AdminEdit";
import AdminCreate from "./pages/admin/AdminCreate";
import Search from "./components/Search";

//offcanvas
import Login from "./components/auth/Login"
import Signup from "./components/auth/Signup"

import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import IsPrivateAdmin from "./components/auth/IsPrivateAdmin";
import PaymentSuccess from "./components/payment/PaymentSuccess";
//import Signup from "./components/auth/Signup";

function App() {
  //para Offcanvas
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const mostrarOcultarLogin = () => setShow(!show);

  return (
    <div className="App">
      <NavBar mostrarOcultarLogin={mostrarOcultarLogin} />
      <Search />

      <Routes>       
        <Route
          path="/profile"
          element={
            <IsPrivate>
              {" "}
              <Profile />{" "}
            </IsPrivate>
          }
        />
        <Route path="/" element={<Home />} />

        {/* cart */}
        <Route path="/cart" element={<IsPrivate><Cart /></IsPrivate>} />
        <Route path="/payment" element={<IsPrivate><Payment /></IsPrivate>} />
        <Route path="/products/:id/details" element={<ProductDetails />} />

        {/* admin */}
        <Route path="/admin" element={<IsPrivateAdmin><AdminHome /></IsPrivateAdmin>} />
        <Route path="/admin/:id/edit" element={<IsPrivateAdmin><AdminEdit /></IsPrivateAdmin>} />
        <Route path="/admin/create" element={<IsPrivateAdmin><AdminCreate /></IsPrivateAdmin>} />
        <Route path="/payment-success" element={ <PaymentSuccess/> }/>
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        name="end"
        backdrop={"truenpm"}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>CUENTA EN IRONWINE</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Login mostrarOcultarLogin={mostrarOcultarLogin}/>
          <Signup />
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default App;
