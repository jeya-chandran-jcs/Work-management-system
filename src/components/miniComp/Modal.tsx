import { useState, type ChangeEvent } from "react"
import { auth } from "../../googleSignIn/config"
import { API } from "../../global"
import useFetchPost from "../../hooks/useFetchPost"
import { Mutation, useMutation } from "@tanstack/react-query"
import { v4 as uuidv4 } from 'uuid';
import updateTask from "../../hooks/updateTask"
import type { TaskType } from "../../types/data"
import { ModalHelper } from "../../utility/modal"


type ModalProps = {
  name: string;
  id: string;
  department: string;
  onClose: () => void;
  keyMessage: "assignTask" | "completedTask"; 
  userDueDate?:string,
  title?:string
};

export default function Modal({name,id,department,onClose,keyMessage,userDueDate,title,Uid}:ModalProps) {
    
    const [postData,setPostData]=useState<TaskType>({title:null,description:null,dueDate:null,completedDate:null})
    const [error,setError]=useState("")  
  console.log("due date for check",postData?.dueDate)
    const mutation=useMutation({
        mutationFn:updateTask,
        onSuccess:(data)=>{ 
            console.log("task assigned",data)
            onClose()
        },
        onError:(error)=>{
            setError(error)


            console.error(error)
        }   

    })  
    ModalHelper()
    const uuid:string = uuidv4();
   
    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=e.target
        setPostData((prev)=>({...prev,[name]:value}))
    }
    const todayDate=new Date()
    const handleAssign=async(e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        console.log("user id",id)
        
        // const date=`${todayDate.getDate()}-${todayDate.getMonth()+1}-${todayDate.getFullYear()} ${todayDate.getHours()}:${todayDate.getMinutes()}:${todayDate.getSeconds()}`
        // const keyMessage="assignTask"
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
                        assignedDate:todayDate,
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
                    completedDate:new Date(),
                    keyMessage
                })
                
            onClose()
        }
       
 
  
            
    }

    const handleUserDueDate=(date)=>{
        if(date)
        {
            const [sortedDate,time]=date?.split("T")
            return sortedDate
        }
    }

    return (
    <div className='min-h-screen w-full flex justify-center items-center bg-gray-300/40'>
       
        <div className='w-full max-w-sm h-1/4 flex flex-col border border-gray-500 bg-white rounded-lg shadow-lg overflow-hidden'>
            
            <div className='w-full flex justify-between items-center bg-blue-400 border-b border-gray-300'>
                <p className='text-black font-semibold text-md ml-3'>{department}</p>
                <button className='text-black font-bold text-md p-1 px-3 hover:bg-black hover:text-white rounded' onClick={onClose}>X</button>
            </div>

            <form className='w-full flex flex-col p-3 gap-3'>
                <label className='font-semibold text-gray-700' htmlFor='task'>{keyMessage ==="assignTask" ? "Assign a Task:" : "Complete Task"} {name}</label>
                <input
                    placeholder='Title'
                    name="title"
                    value={keyMessage === "completedTask" ? title : postData.title ?? ""}
                    onChange={handleChange}
                    readOnly={keyMessage === "completedTask"}
                    id='title'
                    className='w-full rounded-md border border-gray-600 text-gray-800 font-semibold text-md px-4 py-2 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-100'
                 />
                <textarea placeholder='Type your task here...' name="description" value={postData.description} onChange={handleChange} id='task'  rows={4} className='w-full  rounded-md border border-gray-600 text-gray-800 font-semibold text-md px-4 py-2 hover:border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-blue-100'/>
                <div className="w-full flex justify-between items-center my-2 gap-2">
                    <label className="w/3/4">Due Date:</label>
                    {keyMessage==="completedTask" ? 
                    <p className="text-center text-gray-600 font-semibold text-md pr-3 py-2">{handleUserDueDate(userDueDate)}</p>
                    :
                    <input onChange={handleChange} value={postData.dueDate} name="dueDate" className="text-center text-gray-600 font-semibold text-md rounded-lg border border-gray-500 shadow-md focus:outline-none focus:ring-1 focus:ring-blue-400 pr-3 py-2 " type="date"/>
                    }
                </div>
            </form>
            
            <div className='w-full flex justify-between items-center p-2 bg-gray-50 '>
                <button className='bg-red-500 font-bold text-md text-white px-3 py-1 rounded-md' onClick={onClose}>Close</button>
                <button className='bg-green-500 font-bold text-md text-white px-3 py-1 rounded-md' onClick={handleAssign}>Assign</button>
            </div>
        </div>
    </div>
  )
}
