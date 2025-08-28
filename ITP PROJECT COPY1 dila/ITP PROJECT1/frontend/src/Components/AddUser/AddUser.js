import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import { useNavigate } from "react-router";
import axios from "axios";



function AddUser() {
  const history = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    gmail: "",
    age: "",
    address: "",
  });

  // Path to the football background image
  const footballBg = require('../ImgUploader/file/Football.jpeg');

  // Animation state
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    setFadeIn(true);
  }, []);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(inputs);
    await sendRequest();
    window.alert("User Added Successfully!");
    history("/userdetails");
  };

  const sendRequest = async () => {
    await axios
      .post("http://localhost:5000/users", {
        name: String(inputs.name),
        gmail: String(inputs.gmail),
        age: Number(inputs.age),
        address: String(inputs.address),
      })
      .then((res) => res.data);
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      minHeight: '100vh',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blurred background image */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundImage: `url(${footballBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        // No filter, show original colors
        transition: 'filter 0.3s',
      }} />
      {/* Overlay for content readability */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        background: 'rgba(255,255,255,0.65)',
        paddingBottom: 40,
      }}>
        <Nav />
        <div style={{
          maxWidth: 420,
          margin: '40px auto',
          borderRadius: 12,
          boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
          padding: 32,
          background: 'rgba(255,255,255,0.92)',
          opacity: fadeIn ? 1 : 0,
          transform: fadeIn ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)',
        }}>
          <h1 style={{ color: '#1a237e', fontSize: 28, marginBottom: 24, textAlign: 'center', letterSpacing: 1 }}>Add User</h1>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <label style={{ fontWeight: 600 }}>Name:</label>
            <input type="text" name="name" onChange={handleChange} value={inputs.name} required style={inputStyle} />

            <label style={{ fontWeight: 600 }}>Gmail:</label>
            <input type="email" name="gmail" onChange={handleChange} value={inputs.gmail} required style={inputStyle} />

            <label style={{ fontWeight: 600 }}>Age:</label>
            <input type="Number" name="age" onChange={handleChange} value={inputs.age} required style={inputStyle} />

            <label style={{ fontWeight: 600 }}>Address:</label>
            <input type="text" name="address" onChange={handleChange} value={inputs.address} required style={inputStyle} />

            <input type="submit" value="Submit" style={{
              background: '#1a237e', color: '#fff', border: 'none', borderRadius: 6, padding: '12px 0', fontWeight: 700, fontSize: 16, cursor: 'pointer', marginTop: 10, transition: 'background 0.2s',
            }} />
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  padding: '10px 12px',
  borderRadius: 6,
  border: '1px solid #b0bec5',
  fontSize: 16,
  marginBottom: 4,
  outline: 'none',
  transition: 'border 0.2s',
};

export default AddUser;
