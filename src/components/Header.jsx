import React from "react";

const Header = () => {
  return (
    <nav className="sticky top-0 w-full px-2 py-4 flex  bg-gray-500 items-center">
      <div className="text-white font-bold italic text-3xl ml-5">
        <a href="/">Todolist</a>
      </div>
    </nav>
  );
};

export default Header;
