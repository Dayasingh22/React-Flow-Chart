import React, { useState, Fragment } from "react";

import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  removeElements,
} from "react-flow-renderer";

const initialElements = [
  {
    id: "1",
    type: "input",
    data: { label: "First Node" },
    animated: true,
    position: { x: 0, y: 0 },
  },
];
const onLoad = (reactFlowInstance) => {
  reactFlowInstance.fitView();
};

const Test = () => {
  const [elements, setElements] = useState(initialElements);
  const [name, setName] = useState("");

  const addCircleNode = () => {
    setElements((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        animated: true,
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
        style: {
          background: "#D6D5E6",
          color: "#333",
          wordWrap: "break-word",
          border: "1px solid #222138",
          width: 50,
          borderRadius: 50,
        },
      })
    );
  };

  const addRectangleNode = () => {
    setElements((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        animated: true,
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
        style: {
          background: "#098058",
          color: "#333",
          wordWrap: "break-word",
          border: "1px solid #222138",
        },
      })
    );
  };

  const addSquareNode = () => {
    setElements((e) =>
      e.concat({
        id: (e.length + 1).toString(),
        data: { label: `${name}` },
        animated: true,
        position: {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
        },
        style: {
          background: "#07cfc5",
          color: "#333",
          wordWrap: "break-word",
          border: "1px solid #222138",
          width: 50,
        },
      })
    );
  };

  const onConnect = (params) => setElements((e) => addEdge(params, e));
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));

  return (
    <Fragment>
      <div className="Add">
        <div className="rect">
          <h4>Add a Rectangle Node</h4>
          <input
            type="text"
            placeholder="Name of the Node"
            onChange={(e) => setName(e.target.value)}
            name="title"
          />
          <button type="button" onClick={addRectangleNode}>
            Add Node
          </button>
        </div>

        <div className="rect">
          <h4>Add a Square Node</h4>
          <input
            type="text"
            placeholder="Name of the Node"
            onChange={(e) => setName(e.target.value)}
            name="title"
          />
          <button type="button" onClick={addSquareNode}>
            Add Node
          </button>
        </div>
        <div className="rect">
          <h4>Add a Circle Node</h4>
          <input
            type="text"
            placeholder="Name of the Node"
            onChange={(e) => setName(e.target.value)}
            name="title"
          />
          <button type="button" onClick={addCircleNode}>
            Add Node
          </button>
        </div>
      </div>
      <ReactFlow
        elements={elements}
        onLoad={onLoad}
        style={{ width: "75%", height: "90vh", marginLeft: "20rem" }}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2, animated: true }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Background color="#fff" gap={12} />
        <MiniMap
          nodeColor={(n) => {
            if (n.type === "input") return "blue";

            return "#FFCC00";
          }}
        />
        <Controls />
      </ReactFlow>
    </Fragment>
  );
};

export default Test;
