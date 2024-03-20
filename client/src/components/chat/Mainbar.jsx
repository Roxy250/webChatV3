// import React, { useEffect } from "react";
// import { Typography, Paper, Grid } from "@mui/material";
// import Message from "./Message";
// import SendMessageForm from "./SendMessageForm";

// const Mainbar = ({ msges, user, messagesEndRef, send }) => {
//   useEffect(() => {
//     // Scroll to the bottom of the container when messages change
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [msges, messagesEndRef]);

//   return (
//     <Grid
//       item
//       xs={10}
//       style={{
//         position:"absolute",
//         top: "60px",
//         bottom: "40px",
//         right: "0",
//         width: "75%",
//         // height: "80vh",
//         display: "flex",
//         flexDirection: "row",

//         backgroundColor:"red"
//       }}
//     >
//       <Paper
//         style={{
//           flexGrow: 1,
//           overflowY: "auto",
//           backgroundColor: "rgba(255, 255, 255, 0.2)",
//           backdropFilter: "blur(10px)",
//           // border: "2px solid rgba(255, 255, 255, 0.1)",
//           boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
//           //  position: 'relative',
//           // paddingBottom: "90px",
//         }}
//       >
//         {msges && msges.length > 0 ? (
//           msges.map((msg, i) => (
//             <Message
//               key={i}
//               sender={msg.sender}
//               message={msg.message}
//               timeStamp={msg.timeStamp}
//               isCurrentUser={msg.sender === user.username}
//             />
//           ))
//         ) : (
//           <Typography
//             variant="body1"
//             style={{ textAlign: "center", marginTop: "20px" }}
//           >
//             No messages yet
//           </Typography>
//         )}
//         <div ref={messagesEndRef} />
//       </Paper>
//       <SendMessageForm send={send} />
//     </Grid>
//   );
// };
// export default Mainbar;


import React, { useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import Message from "./Message";
import SendMessageForm from "./SendMessageForm";
import { Scrollbar } from 'react-scrollbars-custom';

const Mainbar = ({ msges, user, messagesEndRef, send }) => {
  useEffect(() => {
    // Scroll to the bottom of the container when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msges, messagesEndRef]);

  return (
    <Grid
      item
      xs={10}
      style={{
        position: "absolute",
        top: "70px",
        bottom: "45px",
        right: "0",
        width: "75%",
      }}
    >
      <Scrollbar
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#333333",
          backdropFilter: "blur(10px)",
          boxShadow: "0 0 10px rgba(255, 255, 255, 0.5)",
        }}
      >
        {msges && msges.length > 0 ? (
          msges.map((msg, i) => (
            <Message
              key={i}
              sender={msg.sender}
              message={msg.message}
              timeStamp={msg.timeStamp}
              isCurrentUser={msg.sender === user.username}
            />
          ))
        ) : (
          <Typography
            variant="body1"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            No messages yet
          </Typography>
        )}
        <div ref={messagesEndRef} />
      </Scrollbar>
      <SendMessageForm send={send} />
    </Grid>
  );
};

export default Mainbar;