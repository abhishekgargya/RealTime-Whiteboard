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
      <form className="mt-5 flex flex-col justify-between h-full">
        <div className="flex flex-grow flex-col gap-4">
          <input type="text" className="bg-white p-1 w-full rounded-md" placeholder="Enter your name" value={name} 
          onChange={(e)=>setName(e.target.value)} />

            <input
              type="text"
              className="bg-white p-1 w-full rounded-md mt-3"
              placeholder="Enter Room Code"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              />
        </div>
        <button type="submit" className="self-center p-2 mb-7 rounded-md text-white font-bold text-xl bg-green-500 hover:bg-green-400 mt-3 cursor-pointer" onClick={handleRoomJoin} >
          Join Room
        </button>
      </form>
    );
}

export default JoinRoomForm;