import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import ThemeToggler from "../Components/Layout/ThemeToggler";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://150.40.238.179:8000/api/admin/login",
        { username, password }
      );
      alert("Login successful!");
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.admin.username);
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Login failed");
      } else {
        setError("Login failed");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen sidebar">
      <div className="fixed top-4 mx-auto">
        <ThemeToggler />
      </div>

      <div className="text-center">
        <h1 className="font-bold text-2xl md:text-4xl">
          PC Registration System
        </h1>
        <h2 className="text-xl md:text-2xl mb-6">Sign in to your account</h2>
      </div>
      <form
        onSubmit={handleLogin}
        method="POST"
        className="flex flex-col justify-center items-center space-y-4"
      >
        <div className="mb-2 relative">
          <label htmlFor="username" className="text-left">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-[#005F8F] bg-transparent text-[#A9A9A9]"
          />
        </div>
        <div className="mb-2 relative">
          <label htmlFor="password" className="text-left ">
            Password
          </label>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-[#005F8F] bg-transparent"
          />
          <span
            className="absolute right-3 top-10 text-textSecondary cursor-pointer"
            onClick={toggleVisibility}
          >
            {passwordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
          </span>
        </div>
        <div className="w-full">
          <button
            type="submit"
            className="w-full p-2 bg-[#005F8F] text-[#CCFFFF]"
            style={{ backgroundColor: "var(--button-color)" }}
          >
            Login
          </button>
        </div>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
