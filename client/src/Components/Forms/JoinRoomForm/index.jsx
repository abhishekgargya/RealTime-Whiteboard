const JoinRoomForm = ()=>{
    return (
      <form className="mt-5">
        <div>
          <input type="text" className="border" placeholder="Enter your name" />
        </div>

        <div className="">
          <div className="flex mt-5">
            <input
              type="text"
              className="border"
              placeholder="Enter Room Code"
            />
          </div>
        </div>
        <button type="submit" className="border w-full mt-3 cursor-pointer">
          Join Room
        </button>
      </form>
    );
}

export default JoinRoomForm;