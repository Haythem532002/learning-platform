import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Sidebar from "../../components/specific/Sidebar/Sidebar";
import bg from './assets/cool-background.png'
import ViewClassroom from "../../components/specific/ViewClassroom/ViewClassroom";
import { Classroom } from '../../types/props';
import { useEffect, useState } from 'react';
import { get, post } from '../../services/api';
import ClassroomAdder from '../../components/specific/ClassroomAdder/ClassroomAdder';


export default function Dashboard(){


  useEffect(()=>{/* 
const res=get('http://localhost:8060/classroom',{
    "title":"anzas.com",
    "password":"",
    "description":"azdazd",
    "date":"Sun Nov 03 2024 00:12:05 GMT+0100 (GMT+01:00)",
    "isPrivate":"false"

}) */
console.log(new Date())
  },[])
  const [classrooms,setClassrooms]=useState<Classroom[]>([])
function test(){

  let cl:Classroom={
    title: 'knazjd',
    description: 'azldla,zkd',
    startingDate: new Date(),
    visibility: true
  }
setClassrooms((prev)=>{
  return [...prev,cl]
})

}

    return(
        <div
          style={{
            maxHeight: "100vh",
            maxWidth: "100vw",
            display: "flex",
          }}
        >
          <Sidebar/>
          <button onClick={test}>azdadazd</button>
            <Routes>
              <Route  path="/"   element={<ViewClassroom classrooms={classrooms}/>}/>
              <Route path="/add_classroom"  element={<ClassroomAdder/>}/>
            </Routes>

            
        </div>
    )
}