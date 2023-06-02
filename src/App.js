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
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/products/:id/details" element={<ProductDetails />} />

        {/* admin */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/edit" element={<AdminCreate />} />
        <Route path="/admin/create" element={<AdminEdit />} />

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
          <Offcanvas.Title>Login</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Login />
          <Signup/>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}

export default App;
