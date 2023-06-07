import { useState } from 'react';
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
    <div className='search-bar'>
      <InputGroup className="mb-3">
        
      <i className ="bi bi-search"  ></i>
        <Form.Control
          
          value={searchInput}
          type="text"
          onChange={handleSearch}
          placeholder='Busque el producto que desee'
        
        />
      </InputGroup>

     
    </div>
  )
}

export default Search