import React from 'react'
import { Navbar } from 'react-bootstrap';

export const NavigationBar = () => {
  return (
        <>
          <Navbar bg="secondary" data-bs-theme="dark">
              <Navbar.Brand href="/">GitHub Accounts Data List</Navbar.Brand>
          </Navbar>
        </>
      );
    }
    
    export default NavigationBar;
