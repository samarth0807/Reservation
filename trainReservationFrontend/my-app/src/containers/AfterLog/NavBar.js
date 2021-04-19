import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import  {SidebarData}  from './SidebarData';
import { IconContext } from 'react-icons';
import '../AfterLog/NavBar.css';
import {Button ,NavBar, Nav, NavItem,Form,NavDropdown} from 'react-bootstrap';
import { FaUserCircle } from "react-icons/io5";


// export const isAdminLoggedIn=()=>{
//   const adminToken=localStorage.getItem('adminToken')
//   // if((adminToken!=null) && (adminToken!='')){
//   //   return true;
//   // }
//   return false;
// }
// export const isLoggedIn=()=>{
//   const userToken=localStorage.getItem('userToken')
//   // if((userToken!=null) && (userToken != '')){
//   //   return true;
//   // }
//   return false;
// }
var isLoggedIn=localStorage.getItem('userToken');
var isAdminLoggedIn=localStorage.getItem('adminToken');

function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const adminLogout=async()=>{
    const response=await fetch('http://localhost:8000/admin/auth/logout', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    const finalResponse=await response.json();
    const successMessage=finalResponse.successMessage;
    
    if(successMessage){
       localStorage.removeItem('adminToken')
       window.location.href='./home'
    }  
    
  }
  const cancelledTickets=async()=>{
    const response=await fetch('http://localhost:8000/user/history/cancelled', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })

    const finalResponse=await response.json();
    console.log(finalResponse);
  }
  const activeTickets=async()=>{
    const response=await fetch('http://localhost:8000/user/history/active', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })

    const finalResponse=await response.json();
    console.log(finalResponse);
  }
  const userHistory=async()=>{
    const response=await fetch('http://localhost:8000/user/history/all', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })

    const finalResponse=await response.json();
    console.log(finalResponse);
  }
  const userLogout=async()=>{
    const response=await fetch('http://localhost:8000/user/logout', {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json' // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // body: JSON.stringify(data) // body data type must match "Content-Type" header
    })
    const finalResponse=await response.json();
    const successMessage=finalResponse.successMessage;
    
    if(successMessage){
       localStorage.removeItem('userToken')
       window.location.href='./afterbook';
    }  
    
  }

  return (
    <>
      
        <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        <div  className="text-warning"style={{fontSize:'25px',fontFamily:'ui-rounded',padding:'10px',marginLeft:'30px'}}>
        <Nav className="justify-content-md" activeKey="/home">
         {/* <Nav.Item>
           <FaIcons.FaUser></FaIcons.FaUser>
         </Nav.Item> */}
         {!(isLoggedIn||isAdminLoggedIn) &&
       <>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href="./login">Sign In</Nav.Link>
        </Nav.Item>
       </>}
       {isLoggedIn &&
        <>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <NavDropdown title="User" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={userHistory}>History</NavDropdown.Item>
          <NavDropdown.Item onClick={cancelledTickets}>Cancelled Tickets</NavDropdown.Item>
          <NavDropdown.Item onClick={activeTickets}>Active Tickets</NavDropdown.Item>
          <NavDropdown.Item onClick={userLogout}>Logout</NavDropdown.Item>
          {/* <NavDropdown.Item href="#">Change Password</NavDropdown.Item> */}
        </NavDropdown>
        </>}
        {isAdminLoggedIn&&
        <>
        <Nav.Item>
          <Nav.Link href="/home">Home</Nav.Link>
        </Nav.Item>
        <NavDropdown title="Admin" id="basic-nav-dropdown">
          <NavDropdown.Item onClick={adminLogout}>Logout</NavDropdown.Item>
          <NavDropdown.Item href='/change-password'>Change Password</NavDropdown.Item>
        </NavDropdown>
        </>}
        </Nav>
        </div>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
    
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;

// import React, { useState } from 'react';
// import Dropdown from 'react-bootstrap/Dropdown'
// import '../AfterLog/NavBar.css';
// import {Button ,NavBar, Nav, NavItem} from 'react-bootstrap';




// function NavbarLogin() {
//   return (
//     <>
//       <div className='navbar' style={{ flexDirection: 'row' }}>
//         <Button className="pr-5 pl-5 mr-3" variant="outline-light" style={{ marginLeft: '98em',marginTop:'1em'}}>Login</Button>
//       </div>
//     </>
//   );
// }

// export const NavbarAfterLogin=(props)=>{
//   return (
//     <>
//       <div className='navbar' style={{ flexDirection: 'row' }}>
//       <Dropdown>
//       <Dropdown.Toggle variant="success" id="dropdown-basic" className="pr-5 pl-5 mr-3" variant="outline-light" style={{ marginLeft: '98em',marginTop:'1em'}}>
//        {props.username}
//       </Dropdown.Toggle>

//       <Dropdown.Menu>
//         <Dropdown.Item href="#">Reset Password</Dropdown.Item>
//         <Dropdown.Item href="#">History</Dropdown.Item>
//         <Dropdown.Item href="#">Logout</Dropdown.Item>
//       </Dropdown.Menu>
//       </Dropdown>
//       </div>
//     </>
//   );
// }

// export default NavbarLogin;
