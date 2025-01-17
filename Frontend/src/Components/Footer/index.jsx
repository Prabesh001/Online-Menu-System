import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaPinterest,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { CiFacebook } from "react-icons/ci";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="footer-top">
        <div className="footer-category">
          <span>Contact Us:</span> <br />
          <Link to="/tablemate/terms-of-use">Terms Of Use</Link>
          <br />
          <Link to="/tablemate/advertisement">Advertisement</Link>
          <br />
        </div>
        <div className="footer-category">
          <span>Our Product:</span>
          <br />
          <Link to="/tablemate/about-us">About Us</Link>
          <br />
          <Link to="/tablemate/marketing">Marketing</Link>
          <br />
        </div>
        <div className="footer-category">
          <span>Legal:</span>
          <br />
          <Link to="/tablemate/privacy-policy">Privacy Policy</Link>
          <br />
          <Link to="/tablemate/cookie-policy">Cookie Policy</Link>
          <br />
        </div>
      </div>
      <hr />
      <center>
        <div className="flex justify-center mb-4 space-x-4 sm:justify-start icon-collection">
          <button
            onClick={() => window.open("#", "_blank")}
            className="text-gray-400 transition-colors duration-300 hover:text-teal-400"
          >
            <FaFacebook size={24} />
          </button>
          <button
            onClick={() => window.open("#", "_blank")}
            className="text-gray-400 transition-colors duration-300 hover:text-teal-400"
          >
            <FaInstagram size={24} />
          </button>
          <button
            onClick={() => window.open("#", "_blank")}
            className="text-gray-400 transition-colors duration-300 hover:text-teal-400"
          >
            <FaPinterest size={24} />
          </button>
          <button
            onClick={() => window.open("#", "_blank")}
            className="text-gray-400 transition-colors duration-300 hover:text-teal-400"
          >
            <FaXTwitter size={22} />
          </button>
        </div>
        <div>
          <a href="https://github.com/Nirajstha0905">Niraj</a> &nbsp;
          <a href="https://github.com/Prabesh001">Prabesh</a> &nbsp;
          <a href="/home">Samyukta</a>
          <p>© All rights reserved by TableMate and Co.</p>
        </div>
      </center>
    </div>
  );
}

export default Footer;
