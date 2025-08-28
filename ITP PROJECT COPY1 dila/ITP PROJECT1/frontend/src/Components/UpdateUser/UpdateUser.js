import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

function UpdateUser() {
  const [inputs, setInputs] = useState({});
  const history = useNavigate();
  const id = useParams().id;

  useEffect(() => {
    const fetchHandler = async () => {
      await axios
        .get(`http://localhost:5000/users/${id}`)
        .then((res) => res.data)
        .then((data) => setInputs(data.user));
    };
    fetchHandler();
  }, [id]);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/users/${id}`, {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);

    sendRequest().then(() => {
      window.alert("User Details Update Successfully!")
      history("/userdetails")
  });
  };

  return (
    <div>
      <Nav/>
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <br />
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={inputs.name}
          required
        />
        <br />
        <br />

        <label>Gmail:</label>
        <br />
        <input
          type="email"
          name="gmail"
          onChange={handleChange}
          value={inputs.gmail}
          required
        />
        <br />
        <br />

        <label>Age:</label>
        <br />
        <input
          type="Number"
          name="age"
          onChange={handleChange}
          value={inputs.age}
          required
        />
        <br />
        <br />

        <label>Address:</label>
        <br />
        <input
          type="text"
          name="address"
          onChange={handleChange}
          value={inputs.address}
          required
        />
        <br />
        <br />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default UpdateUser;
