import React from "react";

const Header = () => {
  return (
    <header className="max-w-3xl mx-auto py-6 px-4 text-center mt-3">
      <h1 className="text-3xl font-bold">Task Manager</h1>
      <p className="text-gray-600 text-sm mt-2 tracking-wide font-bold mx-5">
        A Simple Task Manager web app to manage daily tasks effectively
      </p>
    </header>
  );
};

export default Header;