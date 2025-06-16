
import { API } from "../global"
import { auth } from "../googleSignIn/config"


// export default async function updateTask({id,uuid,title,description,assignedDate,dueDate,completedDate,keyMessage} :{id:string,uuid:string,title:string,description:string,assignedDate:string,dueDate:string,completedDate:string,date:string,keyMessage:string}) {
export default async function updateTask(payLoad :{id:string,uuid:string,title:string,description:string,assignedDate:string,dueDate:string,completedDate:string,date:string,keyMessage:string}) {
    
    const {id,uuid,keyMessage}=payLoad
    const UniqueId=auth.currentUser?.uid

            const res=await fetch(`${API}/${id}`)
            if(!res.ok) throw new Error("failed to fetch single user")

            const response=await res.json()
            console.log(response)
                       
            const assigningData={
                UID:UniqueId,
                uuid:uuid, 
                name:{
                    title:payLoad.title, 
                task:payLoad.description,
                }  ,
                dueDate:payLoad.dueDate,
                ...(keyMessage==="assignTask" && {assignedDate: payLoad.assignedDate}),
                ...(keyMessage==="completedTask" && { completedDate:payLoad.completedDate})
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
            // console.log(resultUpdate)
            return resultUpdate

    
    
    }

