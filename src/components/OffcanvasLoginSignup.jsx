import Offcanvas from "react-bootstrap/Offcanvas";

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { useState } from "react";
function OffcanvasLoginSignup({ show, handleClose, mostrarOcultarLogin }) {

    const [selectedTabName,setSelectedTabName]=useState("signup")
  return (
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
        <Tabs  activeKey={selectedTabName}       
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="signup" title="Signup" onSelect={(e)=>{setSelectedTabName("signup")}} >
            <Signup setSelectedTabName={setSelectedTabName} />
          </Tab>
          <Tab eventKey="login" title="Login" >
            <Login mostrarOcultarLogin={mostrarOcultarLogin}  onSelect={(e)=>{setSelectedTabName("login")}} />
          </Tab>
        </Tabs>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffcanvasLoginSignup;
