import React from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <>
      <div className="w-full h-screen flex flex-col overflow-auto">
        <Header />
        <div className="flex">
          <div className="h-full w-full bg-white">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
