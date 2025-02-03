import React from "react";
import "./footerOption.css"

function Layout({ children }) {
  return (
    <div>
      <main className="footer-container">{children}</main>
    </div>
  );
}

export default Layout;
