import React from "react";

function Layout({ children }) {
  return (
    <div>
      <main className="pt-[260px] sm:pt-[165px] md:pt-[150]">{children}</main>
    </div>
  );
}

export default Layout;
