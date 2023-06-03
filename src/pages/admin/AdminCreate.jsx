import { useState } from "react";
import { RingLoader } from "react-spinners";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { createAdminService } from "../../services/admin.services";

function AdminCreate() {
  const navigate = useNavigate();
  const [formInputs, setFormInputs] = useState({
    name: "",
    description: "",
    image: "",
    price: 1,
    tipo: "",
    bodega: "",
    stock: 1,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleInputsChange = (e) =>
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value }); // actualiza el estado de la propiedad que cambie en ese momento
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true)
      const response = await createAdminService(formInputs);
      console.log("producto creado", response);
      setIsLoading(false)
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        setErrorMessage(error.response.data.errorMessage);
      } else {
        navigate("/error");
      }
    }
  };

  if (isLoading) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }

  return (
    <div>
      <Card className="admin-create-form">
        <h3>Crear Producto</h3>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formFile" className="mb-3">
              {/* cambiar para cloudinary */}
              <Form.Label>Imagen</Form.Label>
              <Form.Control type="file" />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formInputs.name}
                onChange={handleInputsChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Descripción:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formInputs.description}
                onChange={handleInputsChange}
                rows={4}
                style={{ resize: "none" }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bodega</Form.Label>
              <Form.Control
                type="text"
                name="bodega"
                value={formInputs.bodega}
                onChange={handleInputsChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Select aria-label="Default select example">
                <option>Seleccione un tipo de vino:</option>
                <option value="Tinto">Tinto</option>
                <option value="Blanco">Blanco</option>
                <option value="Rosado">Rosado</option>
                <option value="Palo Cortado">Palo Cortado</option>
                <option value="Espumoso">Espumoso</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formInputs.stock}
                onChange={handleInputsChange}
              />
            </Form.Group>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <Button variant="outline-success" type="submit" disabled={isLoading}>
              Crear Producto
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default AdminCreate;
