import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function Search({searchWine}) {
  const [searchInput, setSearchInput] = useState("")

  const handleSearch = (e)=>{
    setSearchInput(e.target.value)
   searchWine(e.target.value)
    
  }
  

  return (
    <>
      <InputGroup className="mb-3">
        <Button variant="outline-secondary" id="button-addon1">
          Button
        </Button>
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          value={searchInput}
          onChange={handleSearch}
        />
      </InputGroup>

     
    </>
  )
}

export default Search