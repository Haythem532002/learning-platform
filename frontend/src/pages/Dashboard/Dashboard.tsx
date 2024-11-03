import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Sidebar from "../../components/specific/Sidebar/Sidebar";
import ViewClassroom from "../../components/specific/ViewClassroom/ViewClassroom";
import { Classroom } from "../../types/props";
import { useEffect, useState } from "react";
import { get } from "../../services/api";
import ClassroomAdder from "../../components/specific/ClassroomAdder/ClassroomAdder";

export default function Dashboard() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const fetchData = async () => {
    const res = await get("http://localhost:8060/classroom");
    // console.log(res.data);
    setClassrooms(res.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        maxHeight: "100vh",
        maxWidth: "100vw",
        display: "flex",
      }}
    >
      <Sidebar />
      {/* <button onClick={test}>azdadazd</button> */}
      <Routes>
        <Route path="/" element={<ViewClassroom classrooms={classrooms} />} />
        <Route path="/add_classroom" element={<ClassroomAdder />} />
      </Routes>
    </div>
  );
}
