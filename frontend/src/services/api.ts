import axios ,{ AxiosResponse} from "axios"




async function post(url:string,data:any){
    let payload={
        data:{},
        ok:0,
        message:""
    }
    console.log(data)
    let response:any=null
    await axios.post(url,data)
    .then((res:AxiosResponse)=>{
         console.log(res)
         response=res
        
        payload.message=res.data.message
        payload.ok=res.data.ok
    })
    .catch((e)=>{
        console.log(e.message)
        payload.ok=-1
    })

return response
}


async function get(url: string, p0: { title: string; password: string; description: string; date: string; isPrivate: string }){
    let payload={
        data:{},
        ok:0,
        message:""
    }
    await axios.post(url)
    .then((res:AxiosResponse)=>{

        if(res.data.ok){

            payload.data=res.data.data


        }
        else{
            console.log(res.data.message)
        }
        
        payload.message=res.data.message
        payload.ok=res.data.ok
    })
    .catch((e)=>{
        console.log(e.message)
        payload.ok=-1
    })

return payload
}





export {get,post}