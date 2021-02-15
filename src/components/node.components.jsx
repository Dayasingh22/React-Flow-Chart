import React, { useEffect, useState, Fragment } from "react";

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
          x: Math.random() * 100,
          y: Math.random() * 100,
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
          x: Math.random() * 100,
          y: Math.random() * 100,
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
          x: Math.random() * 110,
          y: Math.random() * 110,
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

  const onConnect = (params) =>
    setElements((e) =>
      addEdge({ ...params, animated: true, style: { stroke: "#fff" } }, e)
    );
  const onElementsRemove = (elementsToRemove) =>
    setElements((els) => removeElements(elementsToRemove, els));
  const [nodeName, setNodeName] = useState("");
  const [nodeBg, setNodeBg] = useState("");
  const [nodeX, setNodeX] = useState("");
  const [nodeY, setNodeY] = useState("");
  const [element, setElement] = useState({});
  const onElementClick = (event, element) => {
    setElement(event);
    setNodeName(event.data.label);
    setNodeX(event.position.x);
    setNodeY(event.position.y);
  };
  console.log(element);
  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === element.id) {
          el.data = {
            ...el.data,
            label: nodeName,
          };
        }

        return el;
      })
    );
  }, [nodeName, setElements]);

  useEffect(() => {
    setElements((els) =>
      els.map((el) => {
        if (el.id === element.id) {
          el.style = { ...el.style, backgroundColor: nodeBg };
        }

        return el;
      })
    );
  }, [nodeBg, setElements]);

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
        style={{ width: "60%", height: "90vh", marginLeft: "20rem" }}
        onElementClick={onElementClick}
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
      <div className="updatenode__controls">
        <label>label:</label>
        <input
          value={nodeName}
          onChange={(evt) => setNodeName(evt.target.value)}
        />
        <label style={{ marginTop: "10px" }}>
          Position X: {Math.trunc(nodeX)}
        </label>
        <label style={{ marginTop: "10px" }}>
          Position Y: {Math.trunc(nodeY)}
        </label>
        <label className="updatenode__bglabel">background:</label>
        <input
          style={{ width: "150px" }}
          type="color"
          value={nodeBg}
          onChange={(evt) => setNodeBg(evt.target.value)}
        />
      </div>
    </Fragment>
  );
};

export default Test;
