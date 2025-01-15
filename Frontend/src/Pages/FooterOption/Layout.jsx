import React from "react";
import Header from "./Header"
import Footer from "./Footer"

function Layout({ children }) {
  return (
    <div>
      <Header />
      <main className="pt-[260px] sm:pt-[165px] md:pt-[150]">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
