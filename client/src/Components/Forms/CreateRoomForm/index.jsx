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
    <form className="mt-7 flex flex-col justify-between h-full">
      <div>
        <input
          type="text"
          className="rounded-md bg-white p-1 w-full"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          disabled
          type="text"
          value={roomId}
          className=" bg-white p-2 mt-5 w-full rounded-md"
          placeholder="Generate Room Code"
        />
        <div className="flex justify-end p-2">
          <button
            className="p-2 m-2 cursor-pointer text-white font-bold rounded-md bg-green-500 hover:bg-green-400"
            type="button"
            onClick={() => setroomId(uuid())}>
            Generate
          </button>
          <button
            className="p-2 m-2 cursor-pointer rounded-md font-bold bg-[#bebebe] hover:bg-[#F9F7F7]"
            type="button">
            Copy
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="rounded-md mb-7 self-center text-xl text-white bg-green-500 hover:bg-green-400 cursor-pointer p-2 font-bold"
        onClick={handleCreateRoom}>
        Generate Room
      </button>
    </form>
  );
};

export default CreateRoomForm;
