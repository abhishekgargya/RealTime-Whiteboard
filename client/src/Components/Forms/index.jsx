import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";

const Forms = ({uuid, socket, setUser}) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32 mt-10">
        <div className="border border-gray-400 p-6 min-h-[400px] w-full">
          <h1 className="font-bold text-3xl mb-4">CreateRoom</h1>
          <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>

        <div className="border border-gray-400 p-6 min-h-[400px] w-full">
          <h1 className="font-bold text-3xl mb-4">JoinRoom</h1>
          <JoinRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>
      </div>
    );
}

export default Forms;