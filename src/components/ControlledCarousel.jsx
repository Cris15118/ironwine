import { useState } from "react"
import Carousel from 'react-bootstrap/Carousel'
import carrusel1Img from "../assets/carrusel1.webp"
import carrusel2Img from "../assets/carruel2.png"
import carrusel3Img from "../assets/carrusel3.jpg"

function ControlledCarousel() {
    const [index, setIndex]= useState(0)

    const handleSelect = (selectedIndex) =>{
        setIndex(selectedIndex)
    }
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={carrusel1Img}
        alt="First slide"
      />
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={carrusel2Img}
        alt="Second slide"
      />

      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src={carrusel3Img}
        alt="Third slide"
      />

      <Carousel.Caption>
        <h3>Third slide label</h3>
        <p>
          Praesent commodo cursus magna, vel scelerisque nisl consectetur.
        </p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);
}
  

export default ControlledCarousel