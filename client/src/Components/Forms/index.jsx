const Forms = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-32 mt-4">
        <div className="border border-gray-300 p-6 min-h-[400px] w-full">
          <h1 className="font-bold text-3xl mb-4">CreateRoom</h1>
          {/* Put your CreateRoom components here */}
        </div>

        <div className="border border-gray-300 p-6 min-h-[400px] w-full">
          <h1 className="font-bold text-3xl mb-4">JoinRoom</h1>
          {/* Put your JoinRoom components here */}
        </div>
      </div>
    );
}

export default Forms;