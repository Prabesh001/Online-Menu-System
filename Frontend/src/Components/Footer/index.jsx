import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-category">
          <span>Contact Us:</span> <br />
          <a href="#">Help and Support</a>
          <br />
          <a href="#">Join Us</a>
          <br />
        </div>
        <div className="footer-category">
          <span>Our Product:</span>
          <br />
          <a href="#">About Us</a>
          <br />
          <a href="#">FAQ</a>
          <br />
        </div>
        <div className="footer-category">
          <span>Legal:</span>
          <br />
          <a href="#">Terms & Conditions</a>
          <br />
          <a href="#">Privacy Policy</a>
          <br />
        </div>
      </div>
      <hr />
      <center>
        <div>
          <a href="https://github.com/Nirajstha0905">Niraj</a> &nbsp;
          <a href="https://github.com/Prabesh001">Prabesh</a> &nbsp;
          <a href="/home">Samyukta</a>
          <p>©All rights reserved by TableMate and Co.</p>
        </div>
      </center>
    </div>
  );
}

export default Footer;
