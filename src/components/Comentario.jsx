import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import {addComentarioService, allComentariosService} from "../services/comentario.services"
import { RingLoader } from "react-spinners";
import { detailProductService } from "../services/products.services";

function Comentario() {
    const navigate = useNavigate()
    const params = useParams()
    const [formInput, setFormInput]= useState({
        comentario: ""
    })
    const [allComentarios, setAllComentarios]= useState()
    const [isLoading, setIsLoading] = useState(true);
    useEffect(()=>{
        getData()
    },[])
    const getData =async()=>{
        try {
            setIsLoading(true)
     const response =  await allComentariosService(params.id, formInput)
            setAllComentarios(response.data)
            setIsLoading(false)
            
        } catch (error) {
            navigate("/error")
        }
    }
const handleInputChange = (e)=>{
    setFormInput({comentario:e.target.value })
}
const handleSubmit = async (e)=>{
    e.preventDefault()
    try {
       console.log(formInput)
    await addComentarioService(params.id, formInput)
        getData()
  
   setIsLoading(false)
        

        
    } catch (error) {
        navigate("/error")
    }
}

if (isLoading) {
    return (
      <div className="spinner">
        <RingLoader />
      </div>
    );
  }
  return (
    <div>
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
        <Form.Label>Deja tu comentario</Form.Label>
        <Form.Control 
        as="textarea"
        name= "comentario"
        value={formInput.comentario}
        onChange={handleInputChange}
        rows={4}
         />
      </Form.Group>
      <Button
              variant="outline-success"
              type="submit"
              disabled={isLoading}
            >
              Enviar comentario
            </Button>

        </Form>
        {allComentarios.map ((eachComentario)=>{
            return(
                <div key={eachComentario._id}>
                    {eachComentario.comentario}
                </div>
            )

        })}
    </div>
  )
}

export default Comentario