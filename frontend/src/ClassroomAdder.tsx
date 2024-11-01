import React, { useEffect, useState,useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./ClassroomAdder.css"
import {post,get} from "./services/api"
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import PickerComponent from './PickerComponent';
import MaterialComponent from './MaterialComponent';
import ClassroomComponent from './ClassroomComponent';
import { Classroom } from './types/props';
import { AxiosError } from 'axios'
function ClassroomAdder() {
  const [title,setTitle]=useState<string>('')
  const [description,setDescription]=useState<string>('')
  const [password,setPassword]=useState<string>('')
  const [isPrivate,setIsPrivate]=useState<boolean>(false)
  const [isPublic,setIsPublic]=useState<boolean>(true)
  const [materials,setMaterials]=useState<File[]>([])
  const [classrooms,setClassrooms]=useState<Classroom[]>([])
  const [startDate,setStartDate]=useState<Date>(new Date())
  const [hour,setHour]=useState<number>(0)
  const [minute,setMinute]=useState<number>(0)
  const privateButton=useRef<HTMLButtonElement|null>(null)
  const publicButton=useRef<HTMLButtonElement|null>(null)
  const passwordContainer=useRef<HTMLSpanElement|null>(null)
  const passwordInput=useRef<HTMLInputElement|null>(null)
  const clearButton=useRef<HTMLButtonElement|null>(null)
  const hiddenInput=useRef<HTMLInputElement|null>(null)
  const adderForm=useRef<HTMLFormElement|null>(null)
  const hourOtions= [
    "00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
    "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
    "20", "21", "22", "23"
];
const minuteOptions = [
  "00", "01", "02", "03", "04", "05", "06", "07", "08", "09",
  "10", "11", "12", "13", "14", "15", "16", "17", "18", "19",
  "20", "21", "22", "23", "24", "25", "26", "27", "28", "29",
  "30", "31", "32", "33", "34", "35", "36", "37", "38", "39",
  "40", "41", "42", "43", "44", "45", "46", "47", "48", "49",
  "50", "51", "52", "53", "54", "55", "56", "57", "58", "59"
];
const [fileMapper,setFileMapper]=useState<{[key:string]:boolean}>({})

function handleTitle(e:any){
  setTitle(e.target.value)

}
function handlePassword(e:any){
  setPassword(e.target.value)

}
function handleDescription(e:any){
  setDescription(e.target.value)

}
function handleVisibiltyPublic(){
  if(isPublic)return 
  setIsPrivate(isPublic);
  setIsPublic((prev)=>!prev)
}
function handleVisibiltyPrivate(){
  if(isPrivate)return 
  setIsPublic(isPrivate);
  setIsPrivate((prev)=>!prev)
}
function handleFiles(e:any){
  if(e.target.files){
    const file:File=e.target.files[0]
    console.log(fileMapper.hasOwnProperty(file.name))
    if(!fileMapper.hasOwnProperty(file.name)||fileMapper[file.name]==false){
      //we add
      setMaterials((prev)=>{return [...prev,file]});
      setFileMapper((prev)=>{
        return {...prev,[file.name]:true}
      })
    }
    else{
      //notify user added
    }
  }


}


function closeForm(){
  if(adderForm.current)
    adderForm.current.style.opacity='0%';
    setTimeout(()=>{
      if(adderForm.current)
      adderForm.current.style.display='none';

    },200)
  

}
function openForm(){
  if(adderForm.current)
    adderForm.current.style.display='flex';
    setTimeout(()=>{
      if(adderForm.current)
        adderForm.current.style.opacity='100%';

    },200)
  

}
function pickFile(){
  if(hiddenInput.current){
    hiddenInput.current.click()
  }
}
function popUp(state:boolean){
  const stateClass=state?'password-visible':''
  if(passwordContainer.current)
  passwordContainer.current.style.display="flex"
  setTimeout(()=>{
  if(passwordContainer.current)
  passwordContainer.current.className=stateClass+" column"

  },100)
  
}

function removeMaterial(fileName:string){
  setMaterials((prev:File[])=>{
      return prev.filter((p:File)=>p.name!=fileName)

  }) 
  setFileMapper((prev)=>{
    return {...prev,[fileName]:false}
  })

}
function checkRoomData(){
  return (title.length&&description.length)
}
async function addClassroom(){
  if(!checkRoomData())return 

  console.log(classrooms)
//parse to reacl exact date

let newDate=new Date(startDate.toDateString())
    
newDate.setMinutes(minute)
newDate.setHours(hour)
console.log(newDate)
if(newDate.getTime()<new Date().getTime()){
  //notify user
  console.log("invalid")
}
else{
console.log(newDate)

//realtime add

//const data=await post('http://localhost:3000/addClassroom')
const data={ok:1,message:"azd"}
if(data.ok==1){

  setClassrooms((prev)=>{
    const classroom:Classroom={
         title:title,
         description:description,
         startingDate:newDate
    }
  setTitle('')
  setDescription('')
  setStartDate(new Date())
  closeForm()
  if(prev)
    return [...prev,classroom]
  else return [classroom]
  })
}
else{
  //notify
  console.log(data.message)
}
}
}
function makeVisible(status:boolean){
  if(passwordInput.current)
  passwordInput.current.type=(status)?"text":"password"
  if(clearButton.current)
  clearButton.current.style.opacity=(status)?"100%":"50%"
  
}

function handleDate(date:Date|null){
 if(date){
  setStartDate(date)
 }
}
useEffect(()=>{
  if(isPrivate){
    if(privateButton.current)
    privateButton.current.className="checked-visibility"
  //popup password

  popUp(true);


  }
  else{
    //hide password
  popUp(false);

    if(privateButton.current)
    privateButton.current.className=''
  }
  if(isPublic){
    if(publicButton.current)
    publicButton.current.className="checked-visibility"

  }
  else{
    if(publicButton.current)
    publicButton.current.className=''

  }
},[isPrivate,isPublic])

useEffect(()=>{
  try{
    const fetchRooms=async()=>{const data= await get('http://localhost:3000/addClassroom');return data}
  //  const data:any=fetchRooms()
   // setClassrooms(data.classRooms)

  }
  catch(e:any){
    console.log(e.message)
  }

},[])

  return (
    <div id='classroom-container'>
      <div id='classroom-adder'>
        <h5>Add Classroom</h5>
        <button id='classroom-adder-btn' onClick={openForm} >
        </button>
      </div>
      <div id='classrooms-container'>
      {
        
        classrooms.map((classrm:Classroom)=>{
          return (
           <ClassroomComponent classroom={classrm}/>
          )

        })
      }

      </div>
      <form id='classroom-adder-form' ref={adderForm}>
        <button type='button' id='close-btn' onClick={closeForm}>X</button>
        <label htmlFor='title'>Classroom Title</label>
        <input style={{width:"70%" ,height:"2em",textAlign:"center" ,marginBottom:"2em"}} type='text' required onChange={handleTitle} value={title} />
        <label htmlFor='title'>Classroom Description</label>
        <textarea id='classroom-description' style={{width:"70%",maxWidth:"25em",maxHeight:"5em" ,height:"5em",textAlign:"center"}} required onChange={handleDescription} value={description} />
        <div className='spanner' id='visibility-container'>
          <span className='column visibility-element'>
            <label htmlFor='privateCheck'>Private</label>
            <button ref={privateButton} type='button' id='privateCheck' onClick={handleVisibiltyPrivate} name='privateCheck'></button>
          </span>   

          <span className='column visibility-element'>
            <label htmlFor='privateCheck'>Public</label>
            <button  ref={publicButton} type='button' id='publicCheck' onClick={handleVisibiltyPublic} name='publicCheck'></button>
          </span>  
          
        </div> 
          <span id='password-container' ref={passwordContainer} className='column'>
            <label htmlFor='password'>Classroom Password</label>
            <input ref={passwordInput} type='password'  name='password' required onChange={handlePassword} value={password} />
            <button ref={clearButton} type='button' id='password-clear' onMouseDown={()=>makeVisible(true)} onMouseUp={()=>makeVisible(false)}></button>
          </span>  
          <h4>Starting Time</h4>
          <div className='spanner'>
            <div className='column'>
              <label htmlFor='year'>Date</label>
              <DatePicker selected={startDate} onChange={handleDate}  title='hiazd'/>
            </div>
            <div className='column'>
              <label htmlFor='year'>Hour</label>
              <PickerComponent allOptions={hourOtions} defaultValue={hour} setDefaultValue={setHour} />
            </div>
            <div className='column'>
              <label htmlFor='year'>Minute</label>
              <PickerComponent allOptions={minuteOptions} defaultValue={minute} setDefaultValue={setMinute}/>
            </div>
          </div>
          <div className='spanner' style={{marginTop:"2em"}}>
            <div className='column' >
              
              <button onClick={pickFile} type='button' id='classroom-adder-btn' ></button>
              <input ref={hiddenInput} onChange={handleFiles} type='file' style={{display:"none",position:"absolute",width:"0",height:"0",opacity:"0%"}}/>
              
              </div>
            <div className='spanner'>
              {
                materials.map((material)=>{
                  return(
                    
              <MaterialComponent removeMaterial={removeMaterial} fileName={material.name}/>
                  )
                })
              }
            </div>
          </div>
          <button type='button' onClick={addClassroom}>Add Classroom</button>
          
      </form>
      <div id='classroom-card'>

      </div>

    </div>
  )
}

export default ClassroomAdder;
