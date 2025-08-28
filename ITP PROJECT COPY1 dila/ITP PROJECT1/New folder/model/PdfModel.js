 const mongoose = require("mongoose");
 const Schema = mongoose.Schema;

 const pdfSchema = new Schema({
    pdf:{
        type:String,//datatype
        required:true,//validate
    },
    title: {
        type: String,//datatype
        required: true,//validate
    },
      
 });

 module.exports = mongoose.model(
    "PdfDetails",//file name
     pdfSchema //function name
 )
