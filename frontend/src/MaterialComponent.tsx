
import styles from './MaterialComponent.module.css'
import extractExtenstion from './utils/utils'
interface props{
    fileName:string
    removeMaterial:any
}


export default function MaterialComponent(props:props){
const fileName=props.fileName
const extension=extractExtenstion(fileName)
const removeMaterial=props.removeMaterial


    return (
     <div id={styles.main}>
            <button onClick={()=>removeMaterial(fileName)} className={styles.button}>X</button>
        
        <div id={styles.container}>
            <h4>{extension}</h4>
            <h5 className={styles.header}>{fileName}</h5>
            

        </div>
     </div>
    )
}