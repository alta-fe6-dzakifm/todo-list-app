import React from "react";
import Header from "./Header";

const Layout = (props) => {
  return (
    <>
      <div className="w-full h-screen flex flex-col  bg-slate-400 overflow-auto">
        <Header />
        <div className="flex">
          <div className="h-full w-full">{props.children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
