import { useEffect, useRef, useState } from "react"
import './PickerComponent.css'
interface propsType{
    allOptions:string[],
    defaultValue:number,
    setDefaultValue:any
}


const PickerComponent:React.FC<propsType>=({allOptions,defaultValue,setDefaultValue})=>{
const [options,setOptions]=useState<string[]>(allOptions)
const [seachStatus,setSearchStatus]=useState<boolean>(false)
const container=useRef<HTMLDivElement|null>(null)
function generateVision(){
    if(!seachStatus){

    return  <button type="button"  onClick={handleClick} value={defaultValue}  id="picker-component-button" className={'picker-default-btn'}>{options[defaultValue]}</button>
    }
    else{
        
    return  options.map((option,index)=>{
        return <button type="button" onClick={handleClick} value={index}  id="picker-component-button" className={(options[defaultValue]==option)?'picker-default-btn':'picker-option-btn'}>{option}</button>
   })
    }
}

function handleClick(e:any){
    if(seachStatus){
        //apply
          setDefaultValue(e.target.value)
          if(container.current)
            container.current.style.backgroundColor="gray"
          setTimeout(()=>{ if(container.current)
            container.current.style.backgroundColor="transparent"},200)
    }


}
useEffect(()=>{
    if(seachStatus){
        if(container.current)
            container.current.style.height="5em"
        



    }
    else{
        if(container.current)
            container.current.style.height="3em"

    }
},[seachStatus])
    return (
        <div ref={container} onMouseOver={()=>setSearchStatus(true)} onMouseLeave={()=>setSearchStatus(false)} id="picker-component-container">
           {
            generateVision()
           }
        </div>
    )
}

export default PickerComponent