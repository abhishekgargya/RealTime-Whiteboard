import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from "./JoinRoomForm";

const Forms = ({uuid, socket, setUser}) => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32 mt-20 ">
        <div className="flex flex-col rounded-lg p-6 min-h-[400px] w-sm md:w-md bg-gradient-to-r from-gray-800 to-slate-900">
          <h1 className="text-center mt-3 font-bold text-white text-3xl mb-4">
            Create-Room
          </h1>
          <CreateRoomForm uuid={uuid} socket={socket} setUser={setUser} />
        </div>

        <div className="flex flex-col rounded-lg p-6 min-h-[400px] w-sm md:w-md bg-gradient-to-r from-gray-800 to-slate-900">
          <h1 className="text-center mt-3 font-bold text-white text-3xl mb-4">Join-Room</h1>
          <JoinRoomForm uuid={uuid} socket={socket}  setUser={setUser} />
        </div>
      </div>
    );
}

export default Forms;