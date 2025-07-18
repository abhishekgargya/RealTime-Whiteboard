import { useRef, useState } from "react";
import WhiteBoard from "../../Components/Whiteboard";

const RoomPage = ()=> {

    const canvasRef = useRef(null);
    const ctxRef =  useRef(null);


    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");
    const [elements, setElements] = useState([]);
    const [history, setHistory] = useState([]);

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

    return(
        <div className="flex flex-col">
            <h1 className="py-3 w-full text-center font-bold text-3xl text-blue-400">White Board RealTime</h1>
            <div className="mt-10 gap-4 flex justify-center">
                <div className="flex gap-3 space-x-4 border p-2">
                    <div className="flex gap-1">
                        <label htmlFor="pencil">Pencil</label>
                        <input type="radio" id="pencil" name="tool" checked={tool==="pencil"} value="pencil" onChange={(e)=>setTool(e.target.value)} />
                    </div>
                    <div className="flex gap-1">
                        <label htmlFor="line">Line</label>
                        <input type="radio" id="line" name="tool" checked={tool==="line"} value="line" onChange={(e)=>setTool(e.target.value)} />
                    </div>
                    <div className="flex gap-1">
                        <label htmlFor="rect">Rectangle</label>
                        <input type="radio" id="rect" name="tool" checked={tool==="rect"} value="rect" onChange={(e)=>setTool(e.target.value)} />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex gap-3">
                        <label htmlFor="color">Select Color:</label>
                        <input type="color" id="color" className="mt-3" value={color} onChange={(e)=>setColor(e.target.value)}/>
                    </div>
                </div>
                <div className="flex">
                    <button
                    className={`border rounded-md p-2 mx-2 ${
                        elements.length === 0 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    disabled={elements.length === 0}
                    onClick={() => undo()}
                    >
                    Undo
                    </button>
                    <button className={`border rounded-md p-2 mx-2 ${
                        history.length < 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                    disabled={history.length < 1}
                    onClick={() => redo()}
                    >
                    Redo
                    </button>

                </div>
                <div className="flex">
                    <button className="bg-red-500 text-white cursor-pointer p-2 font-bold rounded-md" onClick={handleCanvasClear}>Clear Canvas</button>
                </div>
            </div>
            <div className="w-[100%] h-[80vh] mt-3 p-1 mb-3 border">
                <WhiteBoard canvasRef={canvasRef} ctxRef={ctxRef} elements={elements} setElements={setElements}
                 tool={tool} color={color} />
            </div>
        </div>
    );
}

export default RoomPage;