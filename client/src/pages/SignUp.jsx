// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import toast, { Toaster } from "react-hot-toast";
// import bgVideo from "../assets/BG.mp4";

// const SignUp = () => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState({});
//   const [otp, setOtp] = useState("");
//   const [verificationInProgress, setVerificationInProgress] = useState(false);
//   const [timeRemaining, setTimeRemaining] = useState(0);

//   useEffect(() => {
//     let intervalId;
//     if (timeRemaining > 0) {
//       intervalId = setInterval(() => {
//         setTimeRemaining((prevTime) => Math.max(0, prevTime - 1000));
//       }, 1000);
//     } else {
//       setVerificationInProgress(false); // Set verification to false when time expires
//     }
//     return () => clearInterval(intervalId);
//   }, [timeRemaining]);
//   useEffect(() => {
//         const unloadCallback = (event) => {
//           if (verificationInProgress) {
//             event.preventDefault();
//             // Perform DELETE request to delete the temporary user
//             axios.post("http://localhost:3000/api/user/delete", { email: userInfo.email })
//               .then(response => {
//                 console.log(response.data);
//                 // Now, allow the page to be unloaded
//                 event.returnValue = null;
//                 setDisable(false);
//                 return;
//               })
//               .catch(error => {
//                 console.error("Error deleting user:", error);
//                 // Allow the page to be unloaded even if there's an error
//                 event.returnValue = null;
//                 setDisable(false);
//                 return;
//               });
//               setUserInfo({username:"",email:"",password:""})
//           }
//         };

//         // Add the beforeunload event listener
//         window.addEventListener("beforeunload", unloadCallback);

//         // Cleanup: Remove the event listener when the component unmounts
//         return () => {
//           window.removeEventListener("beforeunload", unloadCallback);
//         };
//       }, [verificationInProgress]);
//   const handleSendOtp = () => {
//     if (!validateInput()) return;
//     axios
//       .post("http://localhost:3000/api/user/register", userInfo)
//       .then(async (response) => {
//         if (!response.data.success) toast.error(response.data.message);
//         else {
//           toast.success(response.data.message);
//           setVerificationInProgress(true);
//           setTimeRemaining(120000);
//         }
//       })
//       .catch((error) => console.log(error));
//   };

//   const handleVerify = () => {
//     axios
//       .post("http://localhost:3000/api/user/verify", {
//         otp,
//         email: userInfo.email,
//       })
//       .then(async (response) => {
//         if (response.data.success) {
//           toast.success(response.data.message);
//           navigate("/login");
//         } else toast.error(response.data.message);
//       })
//       .catch((error) => console.log(error));
//   };

//   const validateInput = () => {
//     const { email, username, password } = userInfo;
//     if (!email || !username || !password) {
//       toast.error("Please fill in all the fields.");
//       return false;
//     }
//     if (!validateEmail(email)) {
//       toast.error("Please enter a valid email address.");
//       return false;
//     }
//     if (username.length < 4 || username.length > 10) {
//       toast.error("Username must be between 4 and 10 characters long.");
//       return false;
//     }
//     if (password.length < 8 || password.length > 12) {
//       toast.error("Password must be between 8 and 12 characters long.");
//       return false;
//     }
//     return true;
//   };

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//   };

//   const inputStyle = {
//     display: "block",
//     border: "none",
//     height: "33px",
//     width: "100%",
//     backgroundColor: "rgba(255,255,255,0.4)",
//     borderRadius: "3.35px",
//     padding: "0 6.67px",
//     marginTop: "1.34px",
//     fontSize: "12px",
//     fontWeight: "200",
//     marginBottom: "10.68px",
//   };

//   const buttonStyle = {
//     width: "100%",
//     backgroundColor: "#1976d2",
//     border: "none",
//     color: "#080710",
//     padding: "10px 0",
//     fontSize: "12px",
//     fontWeight: "400",
//     borderRadius: "3.35px",
//     cursor: "pointer",
//     marginTop: "20px",
//     marginBottom: "5px",
//     textAlign: "center",
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         position: "relative",
//       }}
//     >
//       <video
//         autoPlay
//         loop
//         muted
//         style={{
//           position: "absolute",
//           top: "0",
//           left: "0",
//           width: "100%",
//           height: "100%",
//           objectFit: "cover",
//           zIndex: "-1",
//         }}
//       >
//         <source src={bgVideo} type="video/mp4" />
//         Your browser does not support the video tag.
//       </video>

//       {/* Username, Email, Password Form */}
//       {!verificationInProgress && (
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             width: "400px",
//             height: "auto",
//             backgroundColor: "rgba(255,255,255,0.3)",
//             borderRadius: "6.67px",
//             backdropFilter: "blur(66.67px)",
//             border: "1.34px solid rgba(255,255,255,0.1)",
//             boxShadow: "0 0 26.67px rgba(8,7,16,0.3)",
//             padding: "33.34px 66.67px",
//             fontSize: "13.33px",
//           }}
//         >
//           <h1 style={{ textAlign: "center", marginBottom: "20px" }}>SignUp</h1>
//           {["Email", "Username", "Password"].map((field) => (
//             <div key={field}>
//               <label>{field}:</label>
//               <input
//                 type={field === "Password" ? "password" : "text"}
//                 required
//                 name={field.toLowerCase()}
//                 onChange={(e) =>
//                   setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
//                 }
//                 style={inputStyle}
//               />
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={handleSendOtp}
//             style={{ ...buttonStyle }}
//           >
//             SignUp
//           </button>
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Link
//               to={"/login"}
//               style={{ textDecoration: "none", color: "#1976d2" }}
//             >
//               Already have an account? SignIn
//             </Link>
//           </div>
//         </form>
//       )}

//       {/* OTP Verification Form */}
//       {verificationInProgress && (
//         <form
//           onSubmit={handleSubmit}
//           style={{
//             width: "400px",
//             height: "auto",
//             backgroundColor: "rgba(255,255,255,0.3)",
//             borderRadius: "6.67px",
//             backdropFilter: "blur(66.67px)",
//             border: "1.34px solid rgba(255,255,255,0.1)",
//             boxShadow: "0 0 26.67px rgba(8,7,16,0.3)",
//             padding: "33.34px 66.67px",
//             fontSize: "13.33px",
//           }}
//           >
//           <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
//             Verify OTP
//           </h1>
//           <input
//             placeholder={`Enter OTP - Time remaining: ${Math.floor(timeRemaining / 60000)}:${((timeRemaining % 60000) / 1000).toFixed(0).padStart(2, "0")}`}
//             name="otp"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             style={{
//               ...inputStyle,
//               marginTop: "20px",
//               marginBottom: "6px",
//               textAlign: "center",
//             }}
//             maxLength="4"
//             autoComplete="one-time-code"
//           />
//           <button
//             type="button"
//             onClick={handleVerify}
//             style={buttonStyle}
//           >
//             Verify
//           </button>
//           <div style={{ textAlign: "center", marginTop: "20px" }}>
//             <Link
//               to={"/login"}
//               style={{ textDecoration: "none", color: "#1976d2" }}
//             >
//               Already have an account? SignIn
//             </Link>
//           </div>
//         </form>
//       )}

//       <Toaster position="top-center" />
//     </div>
//   );
// };

// export default SignUp;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import bgVideo from "../assets/BG.mp4";

const SignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const [otp, setOtp] = useState("");
  const [verificationInProgress, setVerificationInProgress] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    let intervalId;
    if (timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => Math.max(0, prevTime - 1000));
      }, 1000);
    } else {
      setVerificationInProgress(false); // Set verification to false when time expires
    }
    return () => clearInterval(intervalId);
  }, [timeRemaining]);
  useEffect(() => {
    const unloadCallback = (event) => {
      if (verificationInProgress) {
        event.preventDefault();
        // Perform DELETE request to delete the temporary user
        axios
          .post("http://localhost:3000/api/user/delete", {
            email: userInfo.email,
          })
          .then((response) => {
            console.log(response.data);
            // Now, allow the page to be unloaded
            event.returnValue = null;
            setDisable(false);
            return;
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            // Allow the page to be unloaded even if there's an error
            event.returnValue = null;
            setDisable(false);
            return;
          });
        setUserInfo({ username: "", email: "", password: "" });
      }
    };

    // Add the beforeunload event listener
    window.addEventListener("beforeunload", unloadCallback);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", unloadCallback);
    };
  }, [verificationInProgress]);
  const handleSendOtp = () => {
    if (!validateInput()) return;
    axios
      .post("http://localhost:3000/api/user/register", userInfo)
      .then(async (response) => {
        if (!response.data.success) toast.error(response.data.message);
        else {
          toast.success(response.data.message);
          setVerificationInProgress(true);
          setTimeRemaining(120000);
        }
      })
      .catch((error) => console.log(error));
  };

  const handleVerify = () => {
    axios
      .post("http://localhost:3000/api/user/verify", {
        otp,
        email: userInfo.email,
      })
      .then(async (response) => {
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/");
        } else toast.error(response.data.message);
      })
      .catch((error) => console.log(error));
  };

  const validateInput = () => {
    const { email, username, password } = userInfo;
    if (!email || !username || !password) {
      toast.error("Please fill in all the fields.");
      return false;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }
    if (username.length < 4 || username.length > 10) {
      toast.error("Username must be between 4 and 10 characters long.");
      return false;
    }
    if (password.length < 8 || password.length > 12) {
      toast.error("Password must be between 8 and 12 characters long.");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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

  const buttonStyle = {
    width: "100%",
    backgroundColor: "#1976d2",
    border: "none",
    color: "#080710",
    padding: "10px 0",
    fontSize: "12px",
    fontWeight: "400",
    borderRadius: "3.35px",
    cursor: "pointer",
    marginTop: "20px",
    marginBottom: "5px",
    textAlign: "center",
  };

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

      {/* Username, Email, Password Form */}
      {!verificationInProgress && (
        <form
          onSubmit={handleSubmit}
          style={{
            width: "400px",
            height: "auto",
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "6.67px",
            backdropFilter: "blur(66.67px)",
            border: "1.34px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 26.67px rgba(8,7,16,0.3)",
            padding: "33.34px 66.67px",
            fontSize: "13.33px",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>SignUp</h1>
          {["Email", "Username", "Password"].map((field) => (
            <div key={field}>
              <label>{field}:</label>
              <input
                type={field === "Password" ? "password" : "text"}
                required
                name={field.toLowerCase()}
                onChange={(e) =>
                  setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
                }
                style={inputStyle}
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleSendOtp}
            style={{ ...buttonStyle }}
          >
            Send OTP
          </button>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link
              to={"/"}
              style={{ textDecoration: "none", color: "#1976d2" }}
            >
              Already have an account? SignIn
            </Link>
          </div>
        </form>
      )}

      {/* OTP Verification Form */}
      {verificationInProgress && (
        <form
          onSubmit={handleSubmit}
          style={{
            width: "400px",
            height: "auto",
            backgroundColor: "rgba(255,255,255,0.3)",
            borderRadius: "6.67px",
            backdropFilter: "blur(66.67px)",
            border: "1.34px solid rgba(255,255,255,0.1)",
            boxShadow: "0 0 26.67px rgba(8,7,16,0.3)",
            padding: "33.34px 66.67px",
            fontSize: "13.33px",
          }}
        >
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Verify OTP
          </h1>
          <input
            placeholder={`Enter OTP - Time remaining: ${Math.floor(
              timeRemaining / 60000
            )}:${((timeRemaining % 60000) / 1000).toFixed(0).padStart(2, "0")}`}
            name="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              ...inputStyle,
              marginTop: "20px",
              marginBottom: "6px",
              textAlign: "center",
            }}
            maxLength="4"
            autoComplete="one-time-code"
          />
          <button type="button" onClick={handleVerify} style={buttonStyle}>
            Verify
          </button>
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Link to={"/"} style={{ textDecoration: "none", color: "#1976d2" }}>
              Already have an account? SignIn
            </Link>
          </div>
        </form>
      )}

      <Toaster position="top-right" />
    </div>
  );
};

export default SignUp;
