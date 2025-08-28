import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";

function Imguploader() {

 const [image, setImage] = useState(null);
  const [allImage, setAllImage] = useState(null);

  //submit function
  const submitImg = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post(
      "http://localhost:5000/uploadImg",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    getImage();
  };

  const onImgChange = (e) => {
    setImage(e.target.files[0]);
  };
//display image part
  const getImage = async () => {
    try {
      const result = await axios.get("http://localhost:5000/getImage");
      setAllImage(result.data.data);
    } catch {
      console.error("Error getting image");
    }
  };

  useEffect(() => {
    getImage();
  }, []);


  return (
    <div>

       <Nav />
      <h1> Img Part</h1>

    <form onSubmit = {submitImg}>
        <input type="file" accept="image/*" onChange={onImgChange}></input><br></br><br></br>
        <button type="submit"> Upload </button><br></br><br></br>
      </form>

      {allImage === null?"" : allImage.map((data)=>(
        <img key = {data._id}
        src={`http://localhost:5000/files/${data.image}` }
            height ={200}
            width={300}
            alt="photos"
            ></img>
      ))}  
      
    </div>
  )
}

export default Imguploader
