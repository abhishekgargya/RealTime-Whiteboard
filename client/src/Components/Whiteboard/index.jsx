import { useEffect, useLayoutEffect, useRef, useState } from "react";
import rough from "roughjs";


const roughGenerator = rough.generator();

const WhiteBoard = ({
  canvasRef,
  ctxRef,
  elements,
  setElements,
  tool,
  color,
  user,
  socket
}) => {

  const [img, setImg] = useState(null);
  useEffect(() => {
    if (!user?.presenter) {
      socket.emit("get-whiteboard");
    }

    const handleWhiteboardData = (data) => {
      setImg(data.imgURL);
    };

    socket.on("whiteboardDataResponse", handleWhiteboardData);

    return () => {
      socket.off("whiteboardDataResponse", handleWhiteboardData);
    };
  }, []);



  if (!user?.presenter) {
    return (
      <>
        <div className="w-full h-full mt-2 border border-black relative">
          <img
            src={img}
            alt="Realtime white board image shared"
            className="w-full h-full object-contain"
          />
        </div>
      </>
    );
  }

  const [isDrawing, setIsDrawing] = useState(false);
  

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;

    canvas.style.width = "100%";
    canvas.style.height = "100%";

    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctxRef.current = ctx;
  }, []);

  useEffect(()=>{
    ctxRef.current.strokeStyle = color;
  },[color])

  useLayoutEffect(() => {
    if(canvasRef){
    if (!canvasRef.current || !ctxRef.current) return;

    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const roughCanvas = rough.canvas(canvas);

    elements.forEach((element) => {
      if (element.type === "pencil") {
        roughCanvas.linearPath(element.path, {
              stroke: element.stroke,
              roughness: 0,
              strokeWidth: 5,
              disableMultiStroke: true,
            })
      } else if (element.type === "line") {
        roughCanvas.draw(
          roughGenerator.line(
            element.offsetX,
            element.offsetY,
            element.x2,
            element.y2,
            {
              stroke: element.stroke,
              roughness: 0,
              strokeWidth: 5,
              disableMultiStroke: true,
            }
          )
        );
      } else if (element.type === "rect") {
        roughCanvas.draw(
          roughGenerator.rectangle(
            element.offsetX,
            element.offsetY,
            element.width,
            element.height,
            {
              stroke: element.stroke,
              roughness: 0,
              strokeWidth: 5,
              disableMultiStroke: true,
            }
          )
        );
      }
    });

    const canvasImage = canvasRef.current.toDataURL();
    socket.emit("whiteboardData", canvasImage);
  }
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;
    setIsDrawing(true);

    if (tool === "pencil") {
      setElements((prev) => [
        ...prev,
        {
          type: "pencil",
          path: [[offsetX, offsetY]],
          stroke: color,
        },
      ]);
    } else if (tool === "line") {
      setElements((prev) => [
        ...prev,
        {
          type: "line",
          offsetX,
          offsetY,
          x2: offsetX,
          y2: offsetY,
          stroke: color,
        },
      ]);
    } else if (tool === "rect") {
      setElements((prev) => [
        ...prev,
        {
          type: "rect",
          offsetX,
          offsetY,
          width: 0,
          height: 0,
          stroke: color,
        },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const { offsetX, offsetY } = e.nativeEvent;

    setElements((prev) =>
      prev.map((ele, index) => {
        if (index !== prev.length - 1) return ele;

        if (ele.type === "pencil") {
          return {
            ...ele,
            path: [...ele.path, [offsetX, offsetY]],
          };
        } else if (ele.type === "line") {
          return {
            ...ele,
            x2: offsetX,
            y2: offsetY,
          };
        } else if (ele.type === "rect") {
          return {
            ...ele,
            width: offsetX - ele.offsetX,
            height: offsetY - ele.offsetY,
          };
        }

        return ele;
      })
    );
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="w-full h-screen ">
      <canvas ref={canvasRef} className="w-full h-screen block" />
    </div>
  );
};

export default WhiteBoard;
