import { useRef,useEffect } from "react";

const WhiteBoard = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, []);

  return (
    <canvas ref={canvasRef} className="bg-black"></canvas>
  )
}

export default WhiteBoard;
