import React, { useState, Fragment } from "react";

import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
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

  const addNode = () => {
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
          border: "1px solid #222138",
          width: 50,
          height: 50,
          borderRadius: 50,
        },
      })
    );
  };

  const onConnect = (params) => setElements((e) => addEdge(params, e));

  return (
    <Fragment>
      <div className="Add">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          name="title"
        />
        <button type="button" onClick={addNode}>
          Add Node
        </button>
      </div>
      <ReactFlow
        elements={elements}
        onLoad={onLoad}
        style={{ width: "100%", height: "80vh" }}
        onConnect={onConnect}
        connectionLineStyle={{ stroke: "#ddd", strokeWidth: 2 }}
        connectionLineType="bezier"
        snapToGrid={true}
        snapGrid={[16, 16]}
      >
        <Background color="#888" gap={16} />
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
