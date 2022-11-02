import React, { useEffect, useRef, useState } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import AddNote from "./AddNote";
import "./AddNote.css";

export interface orgChartProps {
  nodes: any[];
  updateNotes: Function;
}

const LumelOrgChart: React.FC<orgChartProps> = ({ nodes, updateNotes }) => {
  const divRef = useRef(null);
  const lumelChartRef = useRef<OrgChart | null>(null);
  const [sNodeID, setSNodeID] = useState(0);
  const [toolTip, setTooltip] = useState({
    show: false,
    content: "",
    left: 0,
    top: 0,
  });
  const [showNewNote, setShowNewNote] = useState({
    show: false,
    content: "",
    left: 0,
    top: 0,
  });
  const handleAddNote = (e: any, test: any) => {
    const nodeId = e;
    setSNodeID(nodeId);
    if (lumelChartRef.current) {
      const x = lumelChartRef.current.getNode(nodeId).x ?? 0;
      const y = lumelChartRef.current.getNode(nodeId).y ?? 0;
      const width = lumelChartRef.current.getNode(nodeId).w ?? 0;
      const height = lumelChartRef.current.getNode(nodeId).h ?? 0;
      setShowNewNote({
        show: true,
        left: x + width * lumelChartRef.current.getScale() + 100,
        top: y + height,
        content: (lumelChartRef.current.get(nodeId) as any).name,
      });
    }
  };
  const handleCancel = () => {
    setShowNewNote({
      show: false,
      content: "",
      left: 0,
      top: 0,
    });
  };
  const onSave = (note: string) => {
    let nodeDetails: any = lumelChartRef.current?.get(sNodeID);
    if (nodeDetails) {
      nodeDetails.note = note;
    }
    updateNotes(nodeDetails);
    setShowNewNote({
      show: false,
      content: "",
      left: 0,
      top: 0,
    });
  };
  useEffect(() => {
    if (divRef.current) {
      lumelChartRef.current = new OrgChart(divRef.current, {
        nodes,
        nodeMenu: {
          AddNote: {
            text: "Add Note",
            onClick: handleAddNote,
          },
        },
        nodeBinding: {
          field_0: "name",
          img_0: "img",
        },
      });
      lumelChartRef.current.onRedraw(() => {
        const nodeElements = document.querySelectorAll("[data-n-id]");
        for (let i = 0; i < nodeElements.length; i++) {
          const currentNode = nodeElements[i];
          currentNode.addEventListener("mouseenter", function (e) {
            e.preventDefault();
            const nodeId = currentNode.getAttribute("data-n-id");
            const chart = lumelChartRef.current;
            if (nodeId && chart) {
              const x = chart.getNode(nodeId).x ?? 0;
              const y = chart.getNode(nodeId).y ?? 0;
              const width = chart.getNode(nodeId).w ?? 0;
              const height = chart.getNode(nodeId).h ?? 0;
              // console.log("chart.getScale(): ", chart.getScale());
              setTooltip({
                show: true,
                left: x + width * chart.getScale() + 100,
                top: y + height,
                content: (chart.get(nodeId) as any).name,
              });
            }
          });
          nodeElements[i].addEventListener("mouseleave", function (e) {
            e.preventDefault();
            // setTooltip({
            //   show: false,
            //   left: 0,
            //   top: 0,
            //   content: "",
            // });
          });
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div id="tree" ref={divRef}></div>
      <div
        id="tooltip"
        style={{ position: "absolute", left: toolTip.left, top: toolTip.top }}
      >
        {toolTip.show && <h1>{toolTip.content}</h1>}
      </div>
      <div
        style={{
          position: "absolute",
          left: showNewNote.left,
          top: showNewNote.top,
        }}
      >
        {showNewNote.show && (
          <AddNote onCancel={handleCancel} nodeID={sNodeID} onSave={onSave} />
        )}
      </div>
    </>
  );
};

export default LumelOrgChart;
