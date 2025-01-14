import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-category">
          <span>Contact Us:</span> <br />
          <Link to="terms-of-use">Terms Of Use</Link>
          <br />
          <Link to="advertisement">Advertisement</Link>
          <br />
        </div>
        <div className="footer-category">
          <span>Our Product:</span>
          <br />
          <Link to="about-us">About Us</Link>
          <br />
          <Link to="marketing">Marketing</Link>
          <br />
        </div>
        <div className="footer-category">
          <span>Legal:</span>
          <br />
          <Link to="privacy-policy">Privacy Policy</Link>
          <br />
          <Link to="cookie-policy">Cookie Policy</Link>
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
