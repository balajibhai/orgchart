import React, { useEffect, useRef, useState } from "react";
import OrgChart from "@balkangraph/orgchart.js";

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
  const [lumelChart, setLumelChart] = useState<OrgChart | null>(null);
  useEffect(() => {
    if (divRef.current) {
      const chart = new OrgChart(divRef.current, {
        nodes,
        nodeBinding: {
          field_0: "name",
          img_0: "img",
        },
      });
      chart.onRedraw(() => {
        const nodeElements = document.querySelectorAll("[data-n-id]");
        for (let i = 0; i < nodeElements.length; i++) {
          const currentNode = nodeElements[i];
          currentNode.addEventListener("mouseenter", function (e) {
            e.preventDefault();
            const nodeId = currentNode.getAttribute("data-n-id");
            if (nodeId) {
              const x = chart.getNode(nodeId).x ?? 0;
              const y = chart.getNode(nodeId).y ?? 0;
              const width = chart.getNode(nodeId).w ?? 0;
              const height = chart.getNode(nodeId).h ?? 0;
              console.log("chart.getScale(): ", chart.getScale());
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
      setLumelChart(chart);
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
