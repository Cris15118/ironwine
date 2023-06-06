import Offcanvas from "react-bootstrap/Offcanvas";

import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
function OffcanvasLoginSignup({ show, handleClose, mostrarOcultarLogin }) {
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
        <Tabs
          defaultActiveKey="profile"
          id="justify-tab-example"
          className="mb-3"
          justify
        >
          <Tab eventKey="login" title="Login">
            <Login mostrarOcultarLogin={mostrarOcultarLogin} />
          </Tab>
          <Tab eventKey="signup" title="Signup">
            <Signup />
          </Tab>
        </Tabs>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffcanvasLoginSignup;
