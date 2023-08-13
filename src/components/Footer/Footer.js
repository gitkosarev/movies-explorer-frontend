import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copy">&copy; {new Date().getFullYear()} BeatFilm</p>
    </footer>
  );
}

export default Footer;