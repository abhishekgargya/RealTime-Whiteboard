import { useRef, useState } from "react";
import WhiteBoard from "../../Components/Whiteboard";

const RoomPage = ({user, socket, users})=> {

    const canvasRef = useRef(null);
    const ctxRef =  useRef(null);


    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);
    const [openedUserTab, setUserTab] = useState(false);

    const handleCanvasClear = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");

        // ctx.fillRect = "white";
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        setElements([]);
    }

    const undo = () => {
        setHistory((prevHistory) => [...prevHistory, elements[elements.length-1]]);
        setElements((prevElements) => prevElements.slice(0,prevElements.length-1));
    }
    
    const redo = () => {
        setElements((prevElements) => [...prevElements, history[history.length-1]]);
        setHistory((prevHistory) => prevHistory.slice(0,prevHistory.length-1));
    }

    return (
      <div className="w-full m-0 p-0 overflow-hidden">
        <div className="fixed top-0 left-0">
          {!openedUserTab ? (
            <button
              type="button"
              className="flex cursor-pointer px-4 py-2 bg-gray-400 text-white font-bold text-xl rounded-tr-lg rounded-br-lg"
              onClick={() => setUserTab(true)}>
              Users Online
              <svg
                className="ml-5 mt-1 w-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 8">
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
                />
              </svg>
            </button>
          ) : (
            <div className="flex flex-col bg-gray-400 text-white p-4 rounded-tr-lg rounded-br-lg shadow-lg w-60">
              <button
                type="button"
                className="bg-red-500 hover:bg-red-400 text-white px-2 py-1 rounded mb-2 self-center font-bold text-xl cursor-pointer"
                onClick={() => setUserTab(false)}>
                Close
              </button>
              {users.map((usr, index) => (
                <p key={index} className="py-1 border-b border-gray-600">
                  {usr.name} {user && user.userId === usr.userId && "(You)"}
                </p>
              ))}
            </div>
          )}
        </div>
        <div className="flex justify-between items-center w-full px-4">
          <h1 className="py-3 text-center ml-40 font-bold text-7xl text-blue-400 flex-1">
            Sketch Sync
          </h1>
          <span className="text-right whitespace-nowrap text-2xl">
            [Users Online: {users.length}]
          </span>
        </div>

        {user?.presenter && (
          <div className="flex justify-center">
            <div className="shadow-[0_10px_10px_rgba(0,0,0,0.25)] inset-shadow-indigo-300 bg-white rounded-4xl w-[50%] p-1 mt-2 gap-4 flex justify-center gap-4 mb-2">
              <div className="flex gap-3 space-x-4 p-2">
                <div className="flex gap-1">
                  <label htmlFor="pencil">
                    <img
                      src="\src\assets\pencilIcon.png"
                      alt="Pencil"
                      className="mt-1 w-6 h-6"
                    />
                  </label>
                  <input
                    type="radio"
                    id="pencil"
                    name="tool"
                    checked={tool === "pencil"}
                    value="pencil"
                    onChange={(e) => setTool(e.target.value)}
                  />
                </div>
                <div className="flex gap-1">
                  <label htmlFor="line">
                    <img
                      src="\src\assets\lineIcon.png"
                      alt="Line"
                      className="mt-1 w-6 h-6"
                    />
                  </label>
                  <input
                    type="radio"
                    id="line"
                    name="tool"
                    checked={tool === "line"}
                    value="line"
                    onChange={(e) => setTool(e.target.value)}
                  />
                </div>
                <div className="flex gap-1">
                  <label htmlFor="rect">
                    <img
                      src="\src\assets\rectIcon.png"
                      alt="Rect"
                      className="mt-1 w-6 h-6"
                    />
                  </label>
                  <input
                    type="radio"
                    id="rect"
                    name="tool"
                    checked={tool === "rect"}
                    value="rect"
                    onChange={(e) => setTool(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-px h-11 bg-gray-400"></div>
              <div className="flex">
                <div className="flex gap-3">
                  <label className="font-bold" htmlFor="color">
                    Select <br /> Color
                  </label>
                  <input
                    type="color"
                    id="color"
                    className="mt-3"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-px h-11 bg-gray-400"></div>

              <div className="flex">
                <button
                  className={`border rounded-md p-2 mx-2 h-fit mt-1 ${
                    elements.length === 0
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  disabled={elements.length === 0}
                  onClick={() => undo()}>
                  Undo
                </button>
                <button
                  className={`border rounded-md p-2 mx-2 h-fit mt-1 ${
                    history.length < 1
                      ? "cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  disabled={history.length < 1}
                  onClick={() => redo()}>
                  Redo
                </button>
              </div>
              <div className="w-px h-11 bg-gray-400"></div>

              <div className="flex">
                <button
                  className="bg-red-500 text-white cursor-pointer p-2 h-fit mt-1 font-bold rounded-md"
                  onClick={handleCanvasClear}>
                  Clear Canvas
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="w-full h-[calc(100vh-12rem)] overflow-auto">
          <WhiteBoard
            canvasRef={canvasRef}
            ctxRef={ctxRef}
            elements={elements}
            setElements={setElements}
            tool={tool}
            color={color}
            user={user}
            socket={socket}
          />
        </div>
      </div>
    );
}

export default RoomPage;