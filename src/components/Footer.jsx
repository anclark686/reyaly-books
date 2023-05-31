import React from "react";

const github = require("./assets/github.png");
const linkedin = require("./assets/linkedin.png");

const Footer = () => {
  const today = new Date();
  return (
    <div className="footer">
      <footer>
        <div className="footerLinks">
          <a
            href="https://github.com/anclark686"
            target="_blank"
            rel="noreferrer"
          >
            <img
              alt=""
              src={github}
              width="35"
              height="35"
              className="d-inline-block align-left"
            />
          </a>
          <a
            href="https://www.linkedin.com/in/anclark686/"
            target="_blank"
            rel="noreferrer"
          >
            <img
              alt=""
              src={linkedin}
              width="35"
              height="35"
              className="d-inline-block align-left"
            />
          </a>
        </div>
        <a
          href="https://www.ancportfolio.link"
          className="d-inline-block align-left footer-link"
        >
          <div id="portfolioFooter">Portfolio </div>
        </a>
        <p>Copyright &copy; Reyaly Tech {today.getFullYear()}</p>
      </footer>
    </div>
  );
};

export default Footer;
