import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import Nav from "../Nav/Nav";

function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_gfp4lce",
        "template_74fmxom",
        form.current,
        "Xh08qVDB9m6NQyXZ8"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("SUCCESSFUL!")
        },
        (error) => {
          console.log(error.text);
          alert("FAILED")
        }
      );
  };

  return (
    <div>
      <Nav></Nav>
      <h1>Contact Us</h1>

      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <br></br>
        <input type="text" name="user_name" />
        <br></br>
        <br></br>

        <label>Email</label>
        <br></br>
        <input type="email" name="user_email" />
        <br></br>
        <br></br>

        <label>Message</label>
        <br></br>
        <textarea name="message" />
        <br></br>
        <br></br>

        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default ContactUs;
