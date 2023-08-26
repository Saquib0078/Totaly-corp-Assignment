import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import { FaShoppingCart } from 'react-icons/fa'; 
import { Link } from 'react-router-dom';

const NavBar = () => {
  const items=useSelector((state)=>state.cart)
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Shopping-Cart</Navbar.Brand>
        <Link to={'/cart'} style={{color:"#212529"}}> 
              <FaShoppingCart style={{fontSize:"35px"}} /> 
              <span style={{fontSize:"20px",marginLeft:"5px"}}>{items.length}</span>
            </Link>        
      </Container>
    </Navbar>
  )
}

export default NavBar
