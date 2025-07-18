import { useState } from "react";
import { useNavigate } from "react-router-dom";

const JoinRoomForm = ({uuid, socket, setUser})=>{

  const [roomId, setRoomId] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleRoomJoin = (e) => {
    e.preventDefault();

    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: false,
      presenter: false,
    };
    setUser(roomData);
    navigate(`/${roomId}`); 
    socket.emit("userJoined", roomData);
  };

    return (
      <form className="mt-5">
        <div>
          <input type="text" className="border" placeholder="Enter your name" value={name} 
          onChange={(e)=>setName(e.target.value)} />
        </div>

        <div className="">
          <div className="flex mt-5">
            <input
              type="text"
              className="border"
              placeholder="Enter Room Code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
            />
          </div>
        </div>
        <button type="submit" className="border w-full mt-3 cursor-pointer" onClick={handleRoomJoin} >
          Join Room
        </button>
      </form>
    );
}

export default JoinRoomForm;