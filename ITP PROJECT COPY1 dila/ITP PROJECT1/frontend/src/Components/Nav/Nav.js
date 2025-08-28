import React from 'react'
import './Nav.css'
import {Link} from "react-router-dom";

function Nav() {
  return (
    <div>
        <ul className="home-ul">

            <li className="home-ll">
                <Link to="/mainhome"className="active home-a">
                <h1>HOME</h1>
                </Link>
            </li>

            <li className="home-ll">
                 <Link to="/adduser"className="active home-a">
                <h1>ADD USER</h1>
                </Link>
            </li>

             <li className="home-ll">
                <Link to="/userdetails"className="active home-a">
                <h1>USER DETAILS</h1>
                </Link>
            </li>

            <li className="home-ll">
                <Link to="/conus"className="active home-a">
                <h1>CONTACT US</h1>
                </Link>
            </li>

             <li className="home-ll">
                <Link to="/sendpdf"className="active home-a">
                <h1>SEND PDF</h1>
                </Link>
            </li>


             <li className="home-ll">
                <Link to="/imgpart"className="active home-a">
                <h1>PHOTOS</h1>
                </Link>
            </li>



            <li className="home-ll">
                <Link to="/regi"className="active home-a">
                <button>REGISTER</button>
                </Link>
            </li>
            
               <li className="home-ll">
                <Link to="/log"className="active home-a">
                <button>LOGIN</button>
                </Link>
            </li>

        </ul>
    </div>
  )
}

export default Nav
