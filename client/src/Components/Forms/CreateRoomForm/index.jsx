import { useState } from "react";
import { useNavigate } from "react-router-dom";


const CreateRoomForm = ({uuid, socket, setUser}) => {

  const [roomId,setroomId] = useState(()=>uuid());
  const [name,setName] = useState("");

  const navigate = useNavigate(); 

  const handleCreateRoom = (e) => {
    e.preventDefault();

    const roomData = {
      name,
      roomId,
      userId: uuid(),
      host: true,
      presenter: true
    }
    setUser(roomData);
    navigate(`/${roomId}`);
    console.log(roomData);
    socket.emit("userJoined", roomData);
  }

  return (
    <form className="mt-5">
      <div>
        <input type="text" className="border" placeholder="Enter your name" value={name} onChange={(e)=>setName(e.target.value)} />
      </div>

      <div className="">
        <div className="flex mt-5">
          <input disabled type="text" value={roomId} className="border" placeholder="Generate Room Code" />
          <div className="p-2">
            <button className="border p-2 m-2 cursor-pointer" type="button" onClick={()=>setroomId(uuid())}>
              Generate
            </button>
            <button className="border p-2 m-2 cursor-pointer" type="button">
              Copy
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="border w-full mt-3 cursor-pointer" onClick={handleCreateRoom} >Generate Room</button>
    </form>
  );
};

export default CreateRoomForm;
