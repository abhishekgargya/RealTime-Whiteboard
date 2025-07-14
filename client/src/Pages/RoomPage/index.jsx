import { useState } from "react";
import WhiteBoard from "../../Components/Whiteboard";

const RoomPage = ()=> {
    const [tool, setTool] = useState("pencil");
    const [color, setColor] = useState("black");

    return(
        <div className="flex flex-col">
            <h1 className="py-3 w-full text-center font-bold text-3xl text-blue-400">White Board RealTime</h1>
            <div className="mt-10 gap-4 flex justify-center">
                <div className="flex gap-3 space-x-4 border p-2">
                    <div className="flex gap-1">
                        <label htmlFor="pencil">Pencil</label>
                        <input type="radio" id="pencil" name="tool" value="pencil" onChange={(e)=>setTool(e.target.value)} />
                    </div>
                    <div className="flex gap-1">
                        <label htmlFor="line">Line</label>
                        <input type="radio" id="line" name="tool" value="line" onChange={(e)=>setTool(e.target.value)} />
                    </div>
                    <div className="flex gap-1">
                        <label htmlFor="rec">Rectangle</label>
                        <input type="radio" id="rec" name="tool" value="rec" onChange={(e)=>setTool(e.target.value)} />
                    </div>
                </div>
                <div className="flex">
                    <div className="flex gap-3">
                        <label htmlFor="color">Select Color:</label>
                        <input type="color" id="color" className="mt-3" value={color} onChange={(e)=>setColor(e.target.value)}/>
                    </div>
                </div>
                <div className="flex">
                    <button className="cursor-pointer border rounded-md p-2 mx-2">Undo</button>
                    <button className="cursor-pointer border rounded-md p-2 mx-2">Redo</button>
                </div>
                <div className="flex">
                    <button className="bg-red-500 text-white cursor-pointer p-2 font-bold rounded-md">Clear Canvas</button>
                </div>
            </div>
            <div className="mt-3 border">
                <WhiteBoard />
            </div>
        </div>
    );
}

export default RoomPage;