const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const router = require("./routes/UserRoutes");

const app = express();

// ----------------- Middleware -----------------
app.use(express.json());
app.use(cors());
app.use("/users", router);
app.use("/files", express.static("files")); // Serve uploaded PDFs

// ----------------- MongoDB connection -----------------
mongoose.connect("mongodb+srv://Admin1:7e4hyRLCxlEkYsbe@cluster0.0ud3bje.mongodb.net/")
  .then(() => console.log("Connected to MongoDB"))
  .then(() => {
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((err) => console.error("DB error:", err));

// ----------------- Register -----------------
require("./model/Register");
const User = mongoose.model("Register");

app.post("/register", async (req, res) => {
  const { name, gmail, password } = req.body;
  try {
    await User.create({ name, gmail, password });
    res.send({ status: "ok" });
  } catch (err) {
    res.send({ status: "error", message: err.message });
  }
});

// ----------------- Login -----------------
app.post("/login", async (req, res) => {
  const { gmail, password } = req.body;
  try {
    const user = await User.findOne({ gmail });
    if (!user) return res.json({ err: "User not found" });

    if (user.password === password) {
      return res.json({ status: "ok" });
    } else {
      return res.json({ err: "Incorrect password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Server error" });
  }
});

// ----------------- PDF Upload -----------------
require("./model/PdfModel");
const PdfDetails = mongoose.model("PdfDetails");

// Multer Storage Config (corrected!)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files"); // Files will be saved in /files
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix); // Give unique name
  },
});

const upload = multer({ storage });

// Upload Endpoint
app.post("/uploadfile", upload.single("file"), async (req, res) => {
  try {
    const title = req.body.title;
    const pdf = req.file.filename;

    console.log(" Upload received:");
    console.log("Title:", title);
    console.log("File:", req.file);

    await PdfDetails.create({ title, pdf });

    console.log(" PDF uploaded successfully");
    res.send({ status: 200 });
  } catch (err) {
    console.error(" Upload error:", err);
    res.status(500).send({ status: "error", message: err.message });
  }
});

// File Fetch Endpoint
app.get("/getFile", async (req, res) => {
  try {
    const data = await PdfDetails.find({});
    res.send({ status: 200, data });
  } catch (err) {
    console.error(" Get error:", err);
    res.status(500).send({ status: "error", message: err.message });
  }
});


//////////////////////////////////////////////
//Img PArt---------------------------

require("./model/ImgModel");
const ImgSchema = mongoose.model("ImgModel");

const multering = require("multer");
const { syncBuiltinESMExports } = require("module");

const storageimg = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"../frontend/src/Component/ImgUploader/file")

  },
  filename:function(req,file,cb){
    const uniqueSuffix = Date.now();
    cb(null,uniqueSuffix+file.originalname);

  }
});

const uploading = multering({storage : storage});

app.post("/uploadImg",uploading.single("image"),async(req,res) => {
    console.log(req.body);  
  const imageName = req.file.filename;

  try{
    await ImgSchema.create({image:imageName});
    res.json({status:"Ok"})
  }catch(error){
    res.json({status : error})

  }
});

//Display Img

app.get("/getImage", async(req,res) => {
try{
  ImgSchema.find({}).then((data) => {
    res.send ({status:"Ok",data:data});
});
}catch (error){
  res.json({ status:error});
}

});
