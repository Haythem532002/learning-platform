import ClassroomComponentUpdated from "../ClassroomComponent/ClassroomComponentUpdated";
import { Classroom } from "../../../types/props";
import styles from "./viewClassroom.module.css";

interface viewClassroomProps {
  classrooms: Classroom[];
}
const ViewClassroom = (props: viewClassroomProps) => {
  const classrooms: Classroom[] = props.classrooms;

  function render(): any {
    const comp: any = [];
    classrooms.forEach((p, index) => {
      comp.push(<ClassroomComponentUpdated {...p} key={index} />);
    });
    return comp;
  }
  return <div id={styles.container}>{render()}</div>;
};

export default ViewClassroom;
