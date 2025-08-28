import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./User1.css";

function User(props) {
  const user = props.user || {};
  const { _id, name, gmail, age, address } = user;

  //delete function
  const history = useNavigate();

  const deleteHandler = async () => {
    const userConfirmed = window.confirm(
      "Are you sure want to delete this user?"
    );

    if (userConfirmed) {
      try {
        await axios.delete(`http://localhost:5000/users/${_id}`);
        window.alert("User Details Deleted Successfully!");
        history("/userdetails");
        window.location.reload(); //reload the page
      } catch (error) {
        //handle deletion error if needed
        console.error("Error deleting user details:", error);
      }
    }
  };

 

  return (
    <div className="user-box1">
      <h4>ID:{_id}</h4>
      <h4>Name:{name}</h4>
      <h4>Gmail: {gmail} </h4>
      <h4>Age: {age}</h4>
      <h4>Address: {address}</h4>
      <br></br>
      
      <Link to={`/userdetails/${_id}`}>
        <button className="update"> Update</button>
      </Link>
      <button className="delete" onClick={deleteHandler}>Delete</button>
      <br></br> <br></br> <br></br>
    </div>
  );
}

export default User;
