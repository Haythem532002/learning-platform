import ClassroomComponentUpdated from "../ClassroomComponent/ClassroomComponentUpdated";
import { Classroom } from "../../../types/props";
import styles from "./viewClassroom.module.css";
import { Routes, Route } from "react-router-dom";
import ClassroomDetails from "../ClassroomDetails";
import { useState } from "react";

interface viewClassroomProps {
  classrooms: Classroom[];
}
const ViewClassroom = (props: viewClassroomProps) => {
  console.log(props.classrooms);
  const classrooms: Classroom[] = props.classrooms ? props.classrooms : [];

  const [displayed, setDisplayed] = useState<Classroom | null>(null);

  function render(): any {
    let comp: any = [];
    if (!displayed) {
      classrooms.forEach((p, index) => {
        comp.push(
          <ClassroomComponentUpdated
            setDisplayed={setDisplayed}
            classroom={p}
            key={index}
          />
        );
        // <Route
        //   path={`/view-classroom/classroom`}
        //   element={<ClassroomDetails {...p} />}
        // />;
      });
    } else {
      comp = <ClassroomDetails displayed={displayed} />;
    }
    return comp;
  }
  return <div id={styles.container}>{render()}</div>;
};

export default ViewClassroom;
