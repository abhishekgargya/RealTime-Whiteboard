import { Routes, Route } from "react-router-dom";
import io from "socket.io-client"

import Forms from "./Components/Forms";
import RoomPage from "./Pages/RoomPage";
import { useEffect, useState } from "react";

const server = "http://localhost:5000";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);


function App() {

  const [user,setUser] = useState(null);

  useEffect(() => {
    socket.on("userIsJoined", (data) => {
      if(data.success){
        console.log("userJoined");
      } else {
        console.log("something went wrong");
      }
    })
  },[])
  
  
  const uuid = () => {
    var S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return (
      S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4()
    );
  };

  return (
    <div className="flex justify-center ml-5">
      <Routes>
        <Route path="/" element={<Forms uuid={uuid} socket={socket} setUser={setUser} />} />
        <Route path="/:roomId" element={<RoomPage />} ></Route>
      </Routes>

    </div>
  );
}

export default App;
