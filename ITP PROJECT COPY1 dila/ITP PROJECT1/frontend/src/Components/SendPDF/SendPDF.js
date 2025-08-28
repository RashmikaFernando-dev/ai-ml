import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import PdfComp from "./PdfComp";
import { pdfjs } from "react-pdf";
import "./SendPDF.css"


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

function SendPDF() {
  const [title, setTitle] = useState("");
  const [file, saveFile] = useState("");
  const [allPdf, setAllPdf] = useState("");
  const [pdfFile, setPDFFile] = useState(null);

  useEffect(() => {
    getpdf();
  }, []);

  const getpdf = async () => {
    const result = await axios.get("http://localhost:5000/getFile");
    console.log(result.data.data);
    setAllPdf(result.data.data);
  };

  const submitPdf = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    try {
      const result = await axios.post(
        "http://localhost:5000/uploadfile",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(result);

      if (result.data.status === 200) {
        alert("Upload Successful !");
        getpdf();
      } else {
        alert("Upload failed. please try again.");
      }
    } catch (error) {
      console.error("Error Uploading :" + error.message);
      alert("Error Uploading: ");
    }
  };

  //show pdf fuction

  const showPdf = (pdf) => {
    setPDFFile(`http://localhost:5000/files/${pdf}`);
  };

  return (
    <div>
      <Nav />
      <h1>Send PDF</h1>

      <form onSubmit={submitPdf}>
        <lable>PDF Title</lable> <br></br>
        <input
          required
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <br></br>
        <br></br>
        <label>Select PDF File</label>
        <br></br>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => saveFile(e.target.files[0])}
          required
        ></input>
        <br></br>
        <br></br>
        <button>Submit</button>
      </form>

      <div>
        <h3>Pdf Details</h3>
        {allPdf &&
          allPdf.map((data) => (
            <div key={data._id}>
              <h1>Title: {data.title}</h1>
              <button className="show-pdf-btn" onClick={() => showPdf(data.pdf)}>Show Pdf</button>
            </div>
          ))}
      </div>
      <PdfComp pdfFile={pdfFile} />
    </div>
  );
}

export default SendPDF;
