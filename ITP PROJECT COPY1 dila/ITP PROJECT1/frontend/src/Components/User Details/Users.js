import React, { useState, useEffect, useRef } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import User from "../User/User";
import { useReactToPrint } from "react-to-print";
import "./users.css";


const URL = "http://localhost:5000/users";

const fetchHandler = async () => {
  return await axios.get(URL).then((res) => res.data);
};

function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchHandler().then((data) => {
      setUsers(data.users);
    });
  }, []);

  //download function
  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Users Report",
    onAfterPrint: () => alert("Users Report Successfully Downloaded!"),
  });

  //search function
  const[searchQuery, setSearchQuery] = useState("");
  const [noResults, setNoResults] = useState(false);

  const handleSearch = () => {
    fetchHandler().then((data) =>{
          const filteredUsers = data.users.filter((user)=>
        Object.values(user).some((field)=>
        field.toString().toLowerCase().includes(searchQuery.toLowerCase())
        ))
        setUsers(filteredUsers);
        setNoResults(filteredUsers.length ===0);
    });
  };


  const handleSendReport = () =>{
    //create WhatsApp chat URL

    const phoneNumber ="0760386224";
    const message = `selected the drug report from here`
    const WhatsAppUrl  = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;

    //open whatsapp chat in new window
    window.open(WhatsAppUrl,"_black");
  }

  return (
    <div>
      <Nav />
      <h1>User Details Display Page</h1>
     <input
  onChange={(e) => setSearchQuery(e.target.value)}
  type="text"
  name="search"
  placeholder="Search User Details"
/>

       <button className="serach" onClick={handleSearch}> Search</button>
        <h1>User Display</h1>

       {noResults ?(
          <div>
            <p>No Users Found</p>
          </div>
       ):(

        
     

      <div ref={ComponentsRef}>
        {users &&
          users.map((user, i) => (
            <div key={i}>
              <User user={user} />
            </div>
          ))}
      </div>
    )}
      <button className="download" onClick={handlePrint}>Download Report</button>
      <br></br>
      <button className="download" onClick={handleSendReport}>Send WhatsApp Message</button>
    </div>
  );
}


export default Users;
