const CreateRoomForm = () => {
  return (
    <form className="mt-5">
      <div>
        <input type="text" className="border" placeholder="Enter your name" />
      </div>

      <div className="">
        <div className="flex mt-5">
          <input disabled type="text" className="border" placeholder="Generate Room Code" />
          <div className="p-2">
            <button className="border p-2 m-2 cursor-pointer" type="button">
              Generate
            </button>
            <button className="border p-2 m-2 cursor-pointer" type="button">
              Copy
            </button>
          </div>
        </div>
      </div>
      <button type="submit" className="border w-full mt-3 cursor-pointer">Generate Room</button>
    </form>
  );
};

export default CreateRoomForm;
