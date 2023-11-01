import io from "socket.io-client"; // Add this

let socket;

const connectSocket = (user_id, name) => {
  socket = io("http://localhost:3001", {
    query: `user_id=${user_id}&user_name=${name}`,
  });
} // Add this -- our server will run on port 4000, so we connect to it from here

export {socket, connectSocket};
