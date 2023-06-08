import { useState } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

function Search({ searchWine }) {
  const [searchInput, setSearchInput] = useState("");
  const [dropdownSearch, setDropDownSearch] = useState("");

  const handleSearch = (e) => {
    setSearchInput(e.target.value);
    searchWine(e.target.value,dropdownSearch);
  };

const handleSearchChange = async (searchDrop)=>{
 
 console.log(searchDrop)
  setDropDownSearch(searchDrop)
  searchWine(searchInput,searchDrop);
}

  return (
    <div className="search-bar">
      <InputGroup className="mb-3">
      <DropdownButton
          align="end"
          title="Categorías"
          id="dropdown-menu-align-end"
          className="btn-categoria"
        >
         <Dropdown.Item value={"Tinto"} onClick={()=>{handleSearchChange("Tinto")}}>Tinto</Dropdown.Item>
          <Dropdown.Item value={"Blanco"} onClick={()=>{handleSearchChange("Blanco")}}>Blanco</Dropdown.Item>
          <Dropdown.Item value={"Rosado"} onClick={()=>{handleSearchChange("Rosado")}}>Rosado</Dropdown.Item>
          <Dropdown.Item value={"Espumoso"} onClick={()=>{handleSearchChange("Espumoso")}}>Espumoso</Dropdown.Item>
          <Dropdown.Item value={"Palo Cortado"} onClick={()=>{handleSearchChange("Palo Cortado")}}>Palo Cortado</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item value="" eventKey="4" onClick={()=>{handleSearchChange("")}}>
            Todos
          </Dropdown.Item>
        </DropdownButton>
        <Form.Control
          value={searchInput}
          type="text"
          onChange={handleSearch}
          placeholder="Busque el producto que desee"
          
        />
         <i className="bi bi-search"></i>
         
      </InputGroup>
   
    </div>
  );
}

export default Search;
