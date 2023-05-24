import React, { useState } from "react";
import bg from "../assets/image/poster.jpg";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const { user, logIn } = UserAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      // console.log(error);
      setErr(error.message);
    }
  };
  return (
    <>
      <div className="w-full h-screen">
        <img
          className="hidden sm:block absolute w-full h-full object-cover"
          src={bg}
          alt="movies"
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
          <div className="max-w-[450px] h-[600px] mx-auto bg-black/70 text-white">
            <div className="max-w-[320px] mx-auto py-16">
              <h1 className="text-3xl font-bold">Sign In</h1>
              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full py-4"
              >
                <input
                  type="email"
                  placeholder="Email"
                  autoComplete="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-500 rounded-md"
                />
                <input
                  type="password"
                  placeholder="Password"
                  autoComplete="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  className="p-3 my-2 bg-gray-500 rounded-md"
                />
                {err ? (
                  <p className="py-2 text-red-500 tracking-wider text-xs">
                    Cridentials does not match
                  </p>
                ) : null}
                <button className="bg-red-600 py-3 my-4 rounded-md font-bold">
                  Sign In
                </button>
                <div className="flex justify-between text-sm text-gray-500">
                  <p className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                  </p>
                  <p>Need Help</p>
                </div>
                <p className="py-4 ">
                  <span className="text-gray-500 mr-3">
                    Need A New Account?
                  </span>
                  <Link to={"/signup"}> Sign Up</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
