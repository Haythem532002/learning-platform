import Sidebar from "../../components/specific/Sidebar/Sidebar";
import ViewClassroom from "../../components/specific/ViewClassroom/ViewClassroom";
import { Classroom } from "../../types/props";
import { useEffect, useState } from "react";
import { get } from "../../services/api";
import ClassroomAdder from "../../components/specific/ClassroomAdder/ClassroomAdder";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import styles from "./dahsboard.module.css";
import { useAuth } from "../../services/auth/AuthContext";
import ClassroomDetails from "../../components/specific/ClassroomDetails";
export default function Dashboard() {
  const { authToken } = useAuth();

  console.log(authToken);
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const fetchData = async () => {
    const res = await get("http://localhost:8060/classroom");
    console.log(res);
    if (res.data && res.data.length) setClassrooms(res.data);
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
      <div className={styles.content}>
        {
          <Routes>
            <Route
              path="/view_classroom"
              element={<ViewClassroom classrooms={classrooms} />}
            />
            <Route path="/add_classroom" element={<ClassroomAdder />} />
            <Route path="/*" element={<Navigate to="" replace />} />
          </Routes>
        }
      </div>
    </div>
  );
}
