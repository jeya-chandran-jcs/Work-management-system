import { useState, type ChangeEvent } from "react"
import { useMutation } from "@tanstack/react-query"
import { v4 as uuidv4 } from 'uuid';
import updateTask from "../../hooks/updateTask"
import type { TaskType } from "../../types/data"
import { ModalHelper } from "../../utility/modal"
import { useDispatch } from "react-redux"
import { fetchUser } from "../../redux/userSlice"
import type { AppDispatch } from "../../store/store";
import Button from "../base/Button";
import Input from "../base/Input";


type ModalProps = {
  name?: string;
  id: string;
  department: string;
  onClose: () => void;
  keyMessage: "assignTask" | "completedTask"; 
  userDueDate?:string,
  title?:string,
  Uid?:string 
};

export default function Modal({name,id,department,onClose,keyMessage,userDueDate,title,Uid}:ModalProps) {
    
    const [postData,setPostData]=useState<TaskType>({title:null,description:null,dueDate:null,completedDate:null})
    const [error,setError]=useState("")  
    const dispatch=useDispatch<AppDispatch>()
 
    const mutation=useMutation({
        mutationFn:updateTask,
        onSuccess:(data)=>{ 
            console.log("task assigned",data)
            if(keyMessage==="completedTask") dispatch(fetchUser())
            onClose()
        },
        onError:(error)=>{
            setError(error.message)


            console.error(error)
        }   

    })  
    ModalHelper()
    const uuid:string = uuidv4();
    console.log(error)
   
    const handleChange=(e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const {name,value}=e.target
        setPostData((prev)=>({...prev,[name]:value}))
    }
    const todayDate=new Date()


    const handleAssign=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
     
        if(keyMessage==="assignTask") {
             if( !postData.title || !postData.description  || !postData.dueDate  )
                {
                alert("please fill all the fields")
                return
                }
  
            const isoDueDate=new Date(postData.dueDate).toISOString()    
                mutation.mutate({
                        id,
                        uuid:uuid,
                        title:postData.title,
                        description:postData.description,
                        assignedDate:todayDate.toISOString(),
                        dueDate:isoDueDate,
                        keyMessage
                    })
                
            onClose() 

        }

        if(keyMessage==="completedTask")
        {
             if( !postData.description   )
                {
                alert("please fill all the fields")
                return
                }
                console.log("user Title",  title)
                mutation.mutate({
                    id,
                    uuid:Uid,
                    title:title,
                    description:postData.description,
                    dueDate:userDueDate,
                    completedDate:new Date().toISOString(),
                    keyMessage
                })
            onClose()
            
        }
       
 
  
            
    }

    const handleUserDueDate=(date:string)=>{
        if(date)
        {
            const [sortedDate]=date.split("T")
            return sortedDate
        }
        return ""
    }

    return (
    <div className='min-h-screen w-full flex justify-center items-center bg-gray-300/40'>
       
        <div className='w-full max-w-md h-1/4 flex flex-col border border-gray-500 bg-white rounded-lg shadow-lg overflow-hidden'>
            
            <div className='w-full flex justify-between items-center bg-green-300 border-b border-gray-300'>
                <p className='text-green-900 font-semibold text-md ml-3'>{department}</p>
                <Button style={"text-black font-bold text-md p-1 px-3 hover:bg-white hover:text-green-800  rounded"} handleSubmit={onClose} text={"X"} type={"button"}/>
            </div>

            <form className='w-full flex flex-col p-3 gap-3'>
    
                <label className='font-semibold text-gray-700' htmlFor='task'>{keyMessage ==="assignTask" ? "Assign a Task:" : "Complete Task"} {keyMessage==="assignTask" && `${name}`}</label>

                <Input placeHolder={"Title"} name={"title"} value={keyMessage === "completedTask" ? title : postData.title ?? ""}
                handleChange={handleChange} readOnly={keyMessage === "completedTask"} id={"title"} 
                style={'w-full rounded-md border border-gray-600 text-gray-800 font-semibold text-md px-4 py-2 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-50/65'}/>
               
                <textarea placeholder='Type your task here...' name="description" value={postData.description ?? ""} onChange={handleChange} id='task'  rows={4} className='w-full  rounded-md border border-gray-600 text-gray-800 font-semibold text-md px-4 py-2 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-50/65'/>
                <div className="w-full flex justify-between items-center my-2 gap-2">
                    <label className="w/3/4">Due Date:</label>
                    {keyMessage==="completedTask" ? 
                    <p className="text-center text-gray-600 font-semibold text-md pr-3 py-2">{userDueDate ? handleUserDueDate(userDueDate) : "N/A"}</p>
                    :
                    <Input id={"date"} handleChange={handleChange} value={postData.dueDate ?? ""} name={"dueDate"} style={"text-center text-gray-600 font-semibold text-md rounded-lg border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-400 pr-3 py-2 "} type={"date"}/>
              
                    }
                </div>
            </form>
            
            <div className='w-full flex justify-between items-center p-2 bg-gray-50 '>
                <Button style={' font-bold text-md text-gray-700 border-2 bg-white border-gray-400 hover:bg-gray-700 hover:border-white hover:text-white px-3 py-1 rounded-md'} 
                handleSubmit={onClose} text={"Close"} type={"button"}/>

                <Button style={'font-bold text-md text-white px-3 py-1 rounded-md  transition duration-200 bg-indigo-500 hover:bg-indigo-600'} 
                handleSubmit={handleAssign} text={"Assign"} type={"submit"}/>
            </div>
        </div>
    </div>
  )
}
