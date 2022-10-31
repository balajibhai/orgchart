import React, { useEffect, useRef, useState } from "react";
import OrgChart from "@balkangraph/orgchart.js";
import { stringify } from "querystring";

export interface orgChartProps {
  nodes: any[];
}

const LumelOrgChart: React.FC<orgChartProps> = ({ nodes }) => {
  const divRef = useRef(null);
  const [toolTip, setTooltip] = useState({
    show: false,
    content: "",
    left: 0,
    top: 0,
  });
  useEffect(() => {
    if (divRef.current) {
      const chart = new OrgChart(divRef.current, {
        nodes,
        nodeBinding: {
          field_0: "name",
          img_0: "img",
        },
      });
      chart.on("redraw", (sender: OrgChart) => {
        const nodeElements = document.querySelectorAll("[data-n-id]");
        for (let i = 0; i < nodeElements.length; i++) {
          const currentNode = nodeElements[i];
          currentNode.addEventListener("mouseover", function (e) {
            e.preventDefault();
            const nodeId = currentNode.getAttribute("data-n-id");
            if (nodeId) {
              const x = sender.getNode(nodeId).x ?? 0;
              const y = sender.getNode(nodeId).y ?? 0;
              setTooltip({
                show: true,
                left: x,
                top: y,
                content: (sender.get(nodeId) as any).name,
              });
            }
          });
          nodeElements[i].addEventListener("mouseleave", function (e) {
            e.preventDefault();
            setTooltip({
              show: false,
              left: 0,
              top: 0,
              content: "",
            });
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
    </>
  );
};

export default LumelOrgChart;
