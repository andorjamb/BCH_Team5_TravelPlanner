import React,{useState} from 'react';
import {Button,Offcanvas,Nav,NavItem,Toast,ToastHeader,ToastBody} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';


const AdminMenu = (...arg) => {

    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

    return (
        <div>
            <Button variant="primary" onClick={toggleShow} className="me-2">
        Show menu
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...arg}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <>           
         <Toast>
      <ToastHeader>
       hello Admin...
      </ToastHeader>
      <ToastBody>

<Nav vertical className=''>
  <NavItem>
    <NavLink to='/admin/addcity'>
      Add City
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink to='/admin/addsights'>
      Add Tour Sights
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink to='/admin/manageuser'>
      Manage Users
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink
      disabled
      to='/admin/tests'
    >
      running test page
    </NavLink>
  </NavItem>
</Nav>

      </ToastBody>
    </Toast>




            </>

        </Offcanvas.Body>
      </Offcanvas>
        </div>
    );
};

export default AdminMenu;