import React, { useState, useEffect, useRef } from 'react';
import { Layer, Stage, Circle, Line, Text } from 'react-konva';

function DiagramDrawingTool() {
  const [circles, setCircles] = useState([]);
  const [lines, setLines] = useState([]);
  const [text, setText] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const stageRef = useRef(null);

  const handleMouseDown = (event) => {
    setIsDrawing(true);
    setStartPoint({ x: event.evt.offsetX, y: event.evt.offsetY });
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) {
      return;
    }
    const pos = stageRef.current.getPointerPosition();
    setLines([...lines, { points: [startPoint.x, startPoint.y, pos.x, pos.y] }]);
    setStartPoint({ x: pos.x, y: pos.y });
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
    setCircles([...circles, { x: startPoint.x, y: startPoint.y }]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleAddText = (event) => {
    const pos = stageRef.current.getPointerPosition();
    setText('');
    setCircles([...circles, { x: pos.x, y: pos.y }]);
  };

  const handleDragEnd = (index, event) => {
    const pos = event.target.position();
    const newCircles = [...circles];
    newCircles[index] = { x: pos.x, y: pos.y };
    setCircles(newCircles);
  };

  return (
    <>
      <div style={{paddingTop:200}}>
        <label htmlFor="text-input">Text:</label>
        <input type="text" id="text-input" value={text} onChange={handleTextChange} />
        <button onClick={handleAddText}>Add Text</button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight - 50}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        ref={stageRef}
      >
        <Layer>
          {circles.map((circle, index) => (
            <Circle
              key={`circle-${index}`}
              x={circle.x}
              y={circle.y}
              radius={10}
              fill="red"
              draggable
              onDragEnd={(event) => handleDragEnd(index, event)}
            />
          ))}
          {lines.map((line, index) => (
            <Line key={`line-${index}`} points={line.points} stroke="black" strokeWidth={5} />
          ))}
          <Text text={text} x={circles[circles.length - 1]?.x} y={circles[circles.length - 1]?.y} />
        </Layer>
      </Stage>
    </>
  );
}

export default DiagramDrawingTool;


// import React, { useState, useEffect, useRef } from "react";
// import { useHotkeys } from "react-hotkeys-hook";
// import { Canvas, useCanvas } from "@kanva/core";
// import { Diagram, Box, Circle } from "@kanva/diagram";
// import "@kanva/core/lib/styles.css";
// import "@kanva/diagram/lib/styles.css";



// const initialData = {
//   boxes: [],
//   circles: [],
//   texts: [],
// };

// function DiagramEditor() {
//   const [data, setData] = useState(initialData);
//   const [mode, setMode] = useState("box");
//   const [text, setText] = useState("");
//   const canvasRef = useRef(null);
//   const canvas = useCanvas(canvasRef);

//   useEffect(() => {
//     canvas.setMode(mode);
//   }, [mode, canvas]);

//   function handleAddBox(event) {
//     const [x, y] = canvas.getCursorPosition(event);
//     setData((prevData) => ({
//       ...prevData,
//       boxes: [...prevData.boxes, { x, y }],
//     }));
//   }

//   function handleAddCircle(event) {
//     const [x, y] = canvas.getCursorPosition(event);
//     setData((prevData) => ({
//       ...prevData,
//       circles: [...prevData.circles, { x, y }],
//     }));
//   }

//   function handleAddText(event) {
//     const [x, y] = canvas.getCursorPosition(event);
//     setData((prevData) => ({
//       ...prevData,
//       texts: [...prevData.texts, { x, y, text }],
//     }));
//     setText("");
//   }

//   function handleTextChange(event) {
//     setText(event.target.value);
//   }

//   function handleUndo() {
//     canvas.undo();
//   }

//   function handleRedo() {
//     canvas.redo();
//   }

//   function handleClear() {
//     setData(initialData);
//     canvas.clear();
//   }

//   useHotkeys("ctrl+z", handleUndo);
//   useHotkeys("ctrl+y", handleRedo);
//   useHotkeys("ctrl+c", handleClear);

//   return (
//     <div>
//       <div>
//         <button onClick={() => setMode("box")}>Box</button>
//         <button onClick={() => setMode("circle")}>Circle</button>
//         <input type="text" value={text} onChange={handleTextChange} />
//         <button onClick={handleAddText}>Text</button>
//       </div>
//       <Canvas ref={canvasRef}>
//         <Diagram>
//           {data.boxes.map(({ x, y }, index) => (
//             <Box key={index} x={x} y={y} />
//           ))}
//           {data.circles.map(({ x, y }, index) => (
//             <Circle key={index} x={x} y={y} />
//           ))}
//           {data.texts.map(({ x, y, text }, index) => (
//             <text key={index} x={x} y={y}>
//               {text}
//             </text>
//           ))}
//         </Diagram>
//       </Canvas>
//     </div>
//   );
// }

// export default DiagramEditor;
