import e from "express";


const extractExtension=(file:string)=>{
    let extension=''
    for(let k=file.length-1;k>-1;k--){
        if(file[k]=='.')break;
        extension+=file[k]
    }
    console.log(typeof extension)
    extension=extension.split('').reverse().join('')
    console.log(extension)
    return extension.toUpperCase()
}










export default extractExtension






