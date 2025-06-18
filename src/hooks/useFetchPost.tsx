import {  useState } from "react"
import { API } from "../global"
import { auth } from "../googleSignIn/config"


export default function useFetchPost() {
    const [status,setStatus]=useState<"idle"| "success" | "loading" | "error">("idle")
    const [error,setError]=useState<string | null>(null)
    const UniqueId=auth.currentUser?.uid

    const postTask=async({id,name,date,keyMessage} :{id:string,name:string,date:string,keyMessage:string})=>{

        try{
            setStatus("loading")
            setError(null)

            const res=await fetch(`${API}/${id}`)
            if(!res.ok) throw new Error("failed to fetch single user")

            const response=await res.json()
            console.log(response)
           
            const assigningData={
                UID:UniqueId,
                name:name,
                date:date
            }

            const existingData=response[keyMessage] || []
            const updatedAssignData=[...existingData,assigningData]

            const result= await fetch(`${API}/${id}`,{
                method:"PUT",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({[keyMessage]:updatedAssignData})
            })
            if(!result.ok) throw new Error("failed to assign to the user")
           const resultUpdate=await result.json()
            console.log(resultUpdate)

            setStatus("success")
        }
        catch(err:unknown)
        {
            if(err instanceof Error)
            {
                console.error(err.message)
                setError(err.message)
            }
            setStatus("error")
        }
    
    }

    // useEffect(()=>{
    //     if(id) postTask()
    //         else return
    // },[id])
    return {status,error,postTask}
}

