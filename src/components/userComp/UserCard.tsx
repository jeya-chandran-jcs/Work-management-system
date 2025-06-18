import { useParams } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../redux/userSlice'
import { useEffect, useState } from 'react'
import type { AppDispatch } from '../../store/store'
import type { RootState } from '../../store/store'
import type { AdminAssignTask, SideBarFilter, UsercompletedTask, UserProps } from '../../types/data'
import Modal from '../miniComp/Modal'
import { pagination } from '../../utility/pagination'
import Pagination from '../miniComp/Pagination'

export default function UserCard({filter}:SideBarFilter) {
  const [selectedUser,setSelectedUser]=useState<UsercompletedTask | AdminAssignTask | null>(null)
  const [currentPage,setCurrentPage]=useState<number>(1)
  const itemsPerPage:number=4

  

  const dispatch=useDispatch<AppDispatch>()
  const params = useParams({ from: '/user-home/$id' }) 
  const userId = params.id
  
  const reduxData=useSelector((state:RootState)=>state.user.data)
  const loading=useSelector((state:RootState)=>state.user.loading)
  const error=useSelector((state:RootState)=>state.user.error)
  


  useEffect(()=>{
    dispatch(fetchUser())
  },[filter.date,filter.type])

  // states
  if (loading) return <p>Loading user data...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!reduxData) return <p>No user data found.</p>;
 
  // checking the filter type
  const isSolved=filter.type==="solved"


  // user and admin data
  const user=reduxData.find((singleUser:UserProps)=>singleUser.id===userId)
  const adminUid = user?.assignTask?.[0]?.UID;
  const admin=reduxData.find((singleAdmin:UserProps)=>singleAdmin.UID===adminUid)
  


  //function for task filter
  const getFilteredTask=()=>{
       if(!user) return "user not found"

        let taskList = isSolved ? user.completedTask || []
        : 
        user.assignTask.filter((task:AdminAssignTask) => user.completedTask.every((done:UsercompletedTask) => done.uuid !== task.uuid));

        if (filter.date?.trim()) {
          const filterDate = new Date(filter.date);

          if(isSolved) 
          {
            taskList=(taskList as UsercompletedTask[]).filter((task)=>{
              const dateToCompare=task.completedDate
              return new Date(dateToCompare) >= filterDate
            })
          }
          else 
          {
            taskList =(taskList as AdminAssignTask[]).filter((task)=>{
              const dateToCompare=task.dueDate
              return new Date(dateToCompare) >= filterDate
            })
          }
    //       taskList = taskList.filter((task) => {
    //       const dateToCompare = isSolved
    //       ? user.completedTask.find((done:UsercompletedTask) => done.uuid === task.uuid)?.completedDate
    //       : task.dueDate;

    //       return dateToCompare ? isSolved
    //         ? new Date(dateToCompare) < filterDate
    //         : new Date(dateToCompare) > filterDate
    //       : false;
    // });
  }
  if (taskList.length === 0) {
    return isSolved
      ? "Please complete the pending task"
      : "Task hasn't been assigned. Please contact ADMIN or We couldnt`t find any Task  on this date";
  }

  return taskList;
  }

  //extracting the return value
  const filteredTask=getFilteredTask()
  if (typeof filteredTask === 'string') {
  return (
    <div className="w-full flex justify-center items-center min-h-[60vh] text-center text-red-500 font-semibold text-lg">
      {filteredTask}
    </div>
  );
}

  //pagination
  const length=filteredTask.length
  const page=pagination(length,itemsPerPage,currentPage,filteredTask)
  const totalPages=Math.ceil(filteredTask.length/itemsPerPage)
  
  console.log(page) 
 
 //mini-func for assign and date format
  const handleAssignTask=(task:AdminAssignTask | UsercompletedTask)=>{
    setSelectedUser(task)
  }
const handleCloseModal=()=>{
    setSelectedUser(null)
  }

const handleSortedDate=(date:string)=>{
  if(date)
  {
    const [sortedDate]=date.split("T")
  return sortedDate
  }
} 

function isCOmpleted(task:unknown): task is UsercompletedTask{
  return (task as UsercompletedTask).completedDate !== undefined
}

//tsx
return (
 <div className={`w-3/4 min-h-screen bg-gray-50 overflow-y-auto flex flex-wrap  items-center justify-center gap-6 py-10 px-4 shadow shadow-gray-200 ${page.length===1 && "flex-col"}`}>



    {page.length>0 ?  page.map((task:AdminAssignTask) => (
      <div
        key={task.uuid}
        className={`w-full max-w-xl rounded-2xl bg-white shadow-xl flex flex-col border border-gray-200 overflow-hidden ${page.length===1 && "max-w-2xl "}`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 bg-green-100 border-b border-gray-300">
          <p className="text-gray-700 font-semibold">Assigned By:</p>
          <p className="text-green-600 font-bold text-lg">{admin?.name}</p>
        </div>

        {/* Task Details */}
        <div className="px-6 py-4 space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-500 mb-1">Task Title</label>
            <p className="text-gray-800 font-semibold bg-gray-100 p-3 rounded-md">
              { task.name.title}
            </p>
          </div>

          {!isSolved && 
          <div className="flex flex-col space-y-4">

            <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-500 mb-1">Description</label>
            <p className="text-gray-800 font-semibold bg-gray-100 p-3 rounded-md">
              { task.name.task}
            </p>
          </div>

            <label className="text-sm font-medium text-gray-500 mb-1">DueDate</label>
            <p className="text-gray-800 font-semibold bg-gray-100 p-3 rounded-md">
              {handleSortedDate(task.dueDate)}
            </p>
          </div>
          }

          {isSolved && isCOmpleted(task) &&
            <>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-500 mb-1">Submission</label>
                
                <p className="text-gray-800 bg-gray-100 p-3 rounded-md">{task.name.task}</p>
              </div>
              <div className="flex flex-col"> 
                <label className="text-sm font-medium text-gray-500 mb-1">Submitted On</label>
                <p className="text-gray-800 bg-gray-100 p-3 rounded-md">
                  {handleSortedDate(task.completedDate)}
                </p>
              </div>
            </>
         
        }
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 flex justify-between items-center border-t border-gray-200">
          <span
            className={`text-md font-bold ${
              isSolved ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {isSolved ? "Solved" : "Pending"}
          </span>
          <button className={` text-white px-5 py-2 rounded-md  transition duration-200 ${isSolved ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"}`} disabled={isSolved} onClick={()=>handleAssignTask(task)}>
            {isSolved ? "Completed" : "Submit"}
          </button>
          
        </div>
      </div>
    ))
    :
    <p>Task havent been completed yet pleaase complete a task </p> }
    
    {selectedUser && user?.id && user?.department &&
          (  
               <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"> 
                     <Modal id={String(user?.id)}  department={user?.department } title={selectedUser?.name?.title} userDueDate={selectedUser.dueDate} Uid={selectedUser.uuid}  onClose={handleCloseModal} keyMessage={"completedTask"}/>
               </div>
          )
    }
      <Pagination setCurrentPage={setCurrentPage} currentPage={currentPage} totalPages={totalPages}/>
  </div>
);

}


