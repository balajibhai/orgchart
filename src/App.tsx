import { useEffect, useState } from "react";
import OrgChart from "./mytree";

const App = () => {
  const [nodes, setNodes] = useState([
    {
      id: 1,
      name: "Denny Curtis",
      title: "CEO",
      img: "https://cdn.balkan.app/shared/2.jpg",
      note: "",
    },
    {
      id: 2,
      pid: 1,
      name: "Ashley Barnett",
      title: "Sales Manager",
      img: "https://cdn.balkan.app/shared/3.jpg",
      note: "",
    },
    {
      id: 3463636636,
      pid: 1,
      name: "Caden Ellison",
      title: "Dev Manager",
      img: "https://cdn.balkan.app/shared/4.jpg",
      note: "",
    },
    {
      id: 4,
      pid: 2,
      name: "Elliot Patel",
      title: "Sales",
      img: "https://cdn.balkan.app/shared/5.jpg",
      note: "",
    },
    {
      id: 5,
      pid: 2,
      name: "Lynn Hussain",
      title: "Sales",
      img: "https://cdn.balkan.app/shared/6.jpg",
      note: "",
    },
    {
      id: 6,
      pid: 3,
      name: "Tanner May",
      title: "Developer",
      img: "https://cdn.balkan.app/shared/7.jpg",
      note: "",
    },
    {
      id: 7,
      pid: 3,
      name: "Fran Parsons",
      title: "Developer",
      img: "https://cdn.balkan.app/shared/8.jpg",
      note: "",
    },
  ]);

  const updateNotes = (nodeDetails: any) => {
    nodes.map((item, index) => {
      if (item.id === nodeDetails.id) {
        nodes[index] = nodeDetails;
      }
    });
    setNodes([...nodes]);
  };

  // useEffect(() => {
  //   console.log("nodes", nodes);
  // }, [nodes]);

  const deleteNotes = (nodeDetails: any) => {
    nodes.map((item, index) => {
      if (item.id === nodeDetails?.id) {
        nodes[index].note = "";
      }
    });
    setNodes([...nodes]);
  };

  return (
    <div style={{ height: "100%" }}>
      <OrgChart
        nodes={nodes}
        updateNotes={updateNotes}
        deleteNotes={deleteNotes}
      />
    </div>
  );
};

export default App;
