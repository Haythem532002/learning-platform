import ClassroomComponentUpdated from "../ClassroomComponent/ClassroomComponentUpdated";
import { Classroom } from "../../../types/props";
import styles from './viewClassroom.module.css'

interface viewClassroomProps{
  classrooms:Classroom[]
}
const ViewClassroom = (props:viewClassroomProps) => {
const classrooms:Classroom[]=props.classrooms

  function render():any{
    const comp:any=[]
   classrooms.forEach((p)=>{
      comp.push(<ClassroomComponentUpdated {...p} />)
   })
    return <div>{comp}</div>
  }
  return (
    <div id={styles.container}>
      {render()}
    </div>
  );
};

export default ViewClassroom;
