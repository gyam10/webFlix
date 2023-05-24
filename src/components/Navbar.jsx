import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(user?.email);
  return (
    <div className="flex items-center justify-between p-4 z-[100] absolute w-full">
      <Link to="/">
        <h1 className="text-red-500 text-3xl font-bold uppercase">Webflix</h1>
      </Link>
      {user?.email ? (
        <div>
          <Link to={"/account"}>
            <button className="text-white pr-4">Account</button>
          </Link>

          <button
            className="bg-red-500 px-4 py-3 rounded-md cursor-pointer text-white"
            onClick={handleLogout}
          >
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <Link to={"/login"}>
            <button className="text-white pr-4">Sign In</button>
          </Link>
          <Link to={"/signup"}>
            <button className="bg-red-500 px-4 py-3 rounded-md cursor-pointer text-white">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
