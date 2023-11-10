import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import loginImg from "../assets/login.jpg";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({
      ...prev,
      [event.target.name]: [event.target.value],
    }));
  };

  axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8081")
  //     .then((res) => {
  //       if (res.data.valid) {
  //         navigate("/");
  //         // handleAuth(true);
  //       } else {
  //         navigate("/login");
  //         // handleAuth(false);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:8081/login", values)
      .then((res) => {
        if (res.data.Status === "Success") {
          navigate("/");
        } else {
          alert(res.data.Error);
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
      <div className="hidden sm:block">
        <img className="w-full h-full object-cover" src={loginImg} alt="" />
      </div>

      <div className="bg-komatsu-blue-light flex flex-col justify-center">
        <form
          onSubmit={handleSubmit}
          className="max-w-[400px] w-full mx-auto rounded-lg bg-komatsu-blue p-8 px-8"
        >
          <h2 className="text-4xl dark:text-white font-bold text-center">
            Login
          </h2>
          <div className="flex flex-col text-white py-2">
            <label>Email</label>
            <input
              className="text-black rounded-lg bg-gray-200 mt-2 p-2 focus:border-blue-500 focus:bg-gray-300 focus:outline-none"
              type="text"
              onChange={handleInput}
              name="email"
            />
          </div>
          <div className="flex flex-col text-white py-2">
            <label>Password</label>
            <input
              className="p-2 text-black rounded-lg bg-gray-200 mt-2 focus:border-blue-500 focus:bg-gray-300 focus:outline-none"
              type="password"
              onChange={handleInput}
              name="password"
            />
          </div>
          <div className="flex justify-between text-white py-2">
            <p className="flex items-center">
              <input className="mr-2" type="checkbox" /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          {/* <Link to={"/"}> */}
          <button
            type="submit"
            className="w-full my-5 py-2 bg-komatsu-blue-light hover:shadow-lg text-white font-semibold rounded-lg"
          >
            LOGIN
          </button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
}
