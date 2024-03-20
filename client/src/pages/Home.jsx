// import React, { useState, useEffect, useRef } from 'react';
// import { useLocation } from 'react-router-dom';
// import axios from 'axios';
// import io from 'socket.io-client';
// import { useNavigate } from 'react-router-dom';
// import { Container, Grid } from '@mui/material';
// import Header from '../components/chat/Header';
// import Sidebar from '../components/chat/Sidebar';
// import Mainbar from '../components/chat/Mainbar';

// const socket = io('http://localhost:3000');

// const Home = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [user, setUser] = useState(location.state);
//   const [users, setUsers] = useState([]);
//   const [fetch, setFetch] = useState(true);
//   const [msges, setMsges] = useState([]);
//   const messagesEndRef = useRef(null);

//   const logout = (userId) => {
//     axios.post('http://localhost:3000/api/user/logout', { user_id: userId })
//       .then(response => {
//         console.log(response.data.message);
//       })
//       .catch(error => {
//         console.error('Error occurred:', error);
//       });
//     setUsers(prevUsers => prevUsers.filter(u => u.user_id !== userId));
//     setUser(null);
//     navigate('/');
//   }

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   };

//   const send = (message) => {
//     console.log(message);
//     socket.emit('send_message', message, user.user_id, user.room_id, user.username);
//   }

//   useEffect(() => {
//     socket.emit('Join', user?.room_id, user?.username);
//     axios.post('http://localhost:3000/api/message/getmessage', { room_id: user?.room_id })
//       .then(response => {
//         setMsges(response.data.messages);
//         scrollToBottom(); // Scroll to bottom after messages are fetched
//       })
//       .catch(error => {
//         console.error('Error fetching messages:', error);
//       });
//   }, [fetch]);

//   useEffect(() => {
//     socket.on('receive_message', () => {
//       setFetch(prev => !prev);
//     });
//     return () => {
//       socket.off('receive_message');
//     }
//   }, []);

//   useEffect(() => {
//     axios
//       .post('http://localhost:3000/api/user/getall', { room_id: user?.room_id })
//       .then((response) => {
//         if (response.data.users) {
//           setUsers(response.data.users);
//         } else {
//           console.log(response.data.message);
//         }
//       });
//   }, [users]);

//   return (
//     <div style={{ backgroundColor: "black", height: "100vh" }}>
//      { user?(<Container maxWidth="xl" style={{ height: "100%", overflow: "hidden" }}>
//         <Grid container spacing={0} style={{ height: "100%" }}>
//           {/* Header */}
//           <Grid item xs={12}>
//             <Header user={user} logout={logout} />
//           </Grid>

//           {/* Sidebar - Users List */}
//           <Grid item xs={12} sm={3} md={2} lg={2} xl={2}>
//             <Sidebar users={users} />
//           </Grid>

//           {/* Main Content - Messages List and Send Message Form */}
//           <Grid item xs={12} sm={9} md={10} lg={10} xl={10}>
//             <Mainbar msges={msges} user={user} messagesEndRef={messagesEndRef} send={send} />
//           </Grid>
//         </Grid>
//       </Container>):<h1 style={{textAlign:"center",color:"whitesmoke"}}>404 NOT FOUND</h1>}
//     </div>
//   );
// };

// export default Home;


import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import { useNavigate } from 'react-router-dom';
import { Container, Grid } from '@mui/material';
import Header from '../components/chat/Header';
import Sidebar from '../components/chat/Sidebar';
import Mainbar from '../components/chat/Mainbar';
import SendMessageForm from '../components/chat/SendMessageForm';

const socket = io('http://localhost:3000');

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state);
  const [users, setUsers] = useState([]);
  const [fetch, setFetch] = useState(true);
  const [msges, setMsges] = useState([]);
  const messagesEndRef = useRef(null);

  const logout = (userId) => {
    axios.post('http://localhost:3000/api/user/logout', { user_id: userId })
      .then(response => {
        console.log(response.data.message);
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });
    setUsers(prevUsers => prevUsers.filter(u => u.user_id !== userId));
    setUser(null);
    navigate('/');
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const send = (message) => {
    console.log(message);
    socket.emit('send_message', message, user.user_id, user.room_id, user.username);
  }

  useEffect(() => {
    socket.emit('Join', user?.room_id, user?.username);
    axios.post('http://localhost:3000/api/message/getmessage', { room_id: user?.room_id })
      .then(response => {
        setMsges(response.data.messages);
        scrollToBottom(); // Scroll to bottom after messages are fetched
      })
      .catch(error => {
        console.error('Error fetching messages:', error);
      });
  }, [fetch]);

  useEffect(() => {
    socket.on('receive_message', () => {
      setFetch(prev => !prev);
    });
    return () => {
      socket.off('receive_message');
    }
  }, []);

  useEffect(() => {
    axios
      .post('http://localhost:3000/api/user/getall', { room_id: user?.room_id })
      .then((response) => {
        if (response.data.users) {
          setUsers(response.data.users);
        } else {
          console.log(response.data.message);
        }
      });
  }, [users]);

  return (
    <div style={{ backgroundColor: "black", height: "100vh" }}>
      <Container maxWidth="xl" style={{ height: "100%", overflow: "hidden" }}>
        <Grid container spacing={0} style={{ height: "100%" }}>
          {/* Header */}
          <Grid item xs={12}>
            <Header user={user} logout={logout} />
          </Grid>

          {/* Sidebar - Users List */}
          <Grid item xs={12} sm={3} md={2} lg={2} xl={2}>
            <Sidebar users={users} />
          </Grid>

          {/* Main Content - Messages List and Send Message Form */}
          <Grid item xs={12} sm={9} md={10} lg={10} xl={10}>
            <Mainbar msges={msges} user={user} messagesEndRef={messagesEndRef} send={send} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;