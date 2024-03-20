import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import bgVideo from "../assets/BG.mp4";
import toast, { Toaster } from "react-hot-toast";

export default function SignInSide() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    password: "",
    room_id: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!userInfo.username || !userInfo.password || !userInfo.room_id) {
      toast.error("Please fill up all fields.");
      return;
    }

    axios
      .post("http://localhost:3000/api/user/login", userInfo)
      .then(async (response) => {
        if (response.data.success) {
          navigate("/home", { state: response.data.user });
          toast.success(response.data.message);
        } else {
          const errorMessage =
            response.data.message || "Username or password is wrong.";
          toast.error(errorMessage);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("An error occurred. Please try again.");
      });
  };

  const inputStyle = {
    display: "block",
    border: "none",
    height: "33px",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.4)",
    borderRadius: "3.35px",
    padding: "0 6.67px",
    marginTop: "1.34px",
    fontSize: "12px",
    fontWeight: "200",
    marginBottom: "10.68px",
  };

  const ButtonStyle = {
    width: "100%",
    backgroundColor: "#1976d2",
    border: "none",
    color: "#080710",
    padding: "10px 0",
    fontSize: "12px",
    fontWeight: "400",
    borderRadius: "3.35px",
    cursor: "pointer",
    marginTop: "24.12px",
    marginBottom: "6.67px",
    textAlign: "center",
  };

  const formStyle = {
    width: "400px",
    height: "auto",
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: "6.67px",
    backdropFilter: "blur(66.67px)",
    border: "1.34px solid rgba(255,255,255,0.1)",
    boxShadow: "0 0 26.67px rgba(8,7,16,0.3)",
    padding: "33.34px 66.67px",
    fontSize: "13.33px",
  };

  const fields = [
    { label: "Username", name: "username", type: "text" },
    { label: "Password", name: "password", type: "password" },
    { label: "Room ID", name: "room_id", type: "text" }
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
      }}
    >
      <video
        autoPlay
        loop
        muted
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: "-1",
        }}
      >
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>LogIn</h1>
        <div>
          {fields.map((field) => (
            <div key={field.name}>
              <label>{field.label}:</label>
              <input
                type={field.type}
                required
                name={field.name}
                value={userInfo[field.name]}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          ))}
        </div>

        <button type="submit" style={{ ...ButtonStyle, marginTop: "20px" }}>
          LogIn
        </button>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <Link to={"/signup"} style={{ color: "#1976d2", textDecoration: "none" }}>
            Don't have an account? Register
          </Link>
        </div>
      </form>
      <Toaster position="top-right" />
    </div>
  );
}
