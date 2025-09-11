import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const AuthButtons = () => {
  const loginRef = useRef(null);
  const registerRef = useRef(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) return;

    const tl = gsap.timeline();

    tl.from([loginRef.current, registerRef.current], {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      onComplete: () => {
        gsap.set([loginRef.current, registerRef.current], {
          clearProps: "all",
        });
      },
    });
  }, []);

  const handleUserLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    window.location.reload();
  };

  if (token)
    return (
      <div className="flex gap-6 justify-center mt-6">
        <button
          type="button"
          onClick={handleUserLogout}
          className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition transform hover:scale-105 cursor-pointer"
        >
          Logout
        </button>
      </div>
    );

  return (
    <div className="flex gap-6 justify-center mt-6">
      <Link
        ref={loginRef}
        to="/login"
        className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 transition transform hover:scale-105"
      >
        Login
      </Link>

      <Link
        ref={registerRef}
        to="/register"
        className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md hover:bg-green-700 transition transform hover:scale-105"
      >
        Register
      </Link>
    </div>
  );
};

export default AuthButtons;