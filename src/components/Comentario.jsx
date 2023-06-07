import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {
  addComentarioService,
  allComentariosService,
} from "../services/comentario.services";
import { RingLoader } from "react-spinners";

function Comentario() {
  const navigate = useNavigate();
  const params = useParams();
  const [formInput, setFormInput] = useState({
    comentario: "",
  });
  const [allComentarios, setAllComentarios] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      setIsLoading(true);
      const response = await allComentariosService(params.id, formInput);
      setAllComentarios(response.data);
      setIsLoading(false);
    
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };
  const handleInputChange = (e) => {
    setFormInput({ comentario: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formInput);
      await addComentarioService(params.id, formInput);
      getData();

      setIsLoading(false);
    } catch (error) {
      console.log(error);
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
  return (
    <div>
      <div className="container-comentario">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Deja tu comentario</Form.Label>
            <Form.Control
              as="textarea"
              name="comentario"
              value={formInput.comentario}
              onChange={handleInputChange}
              rows={4}
              cols={90}
            />
          </Form.Group>
          <Button variant="outline-success" type="submit" disabled={isLoading}>
            Enviar comentario
          </Button>
        </Form>
      </div>
      <div className="caja-comentarios">
        <h3>Comentarios</h3>
        {allComentarios.map((eachComentario) => {
          return (
            <div>
              <p>Escrito por: {eachComentario.user.username} </p>

              <div className="comentarios" key={eachComentario._id}>
                {eachComentario.comentario}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Comentario;
