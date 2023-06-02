import { Route, Routes } from "react-router-dom";
import "./App.css";
import Error from "./pages/error/Error";
import NotFound from "./pages/error/NotFound";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
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
function App() {
  return (
    <div className="App">
      <NavBar />
      <Search />
      <Routes>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/profile" element={  <IsPrivate> <Profile />{" "}</IsPrivate>} />
        <Route path="/" element={<Home />} />

        {/* cart */}
        <Route path="/cart" element={ <Cart /> }/>      
        <Route path="/payment" element={ <Payment /> }/>  
        <Route path="/products/:id/details" element={ <ProductDetails /> }/>  


        {/* admin */}
        <Route path="/admin" element={ <AdminHome />}  />
        <Route path="/admin/edit" element={ <AdminCreate/>}  />
        <Route path="/admin/create" element={ <AdminEdit />}/>

        
        <Route path="/error" element={<Error />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
