import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalCookies(props) {
  return (
    <div>
       <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      autoFocus= "true"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pasarela de pago
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
         
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>aceptar</Button>
      </Modal.Footer>
    </Modal>
    </div>
  )
}

export default ModalCookies