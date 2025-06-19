import type {  AdminFilterProps } from "../../types/data"
import Button from "../base/Button"


export default function AdminSideBar({userFilter,setUserFilter}:AdminFilterProps) {
    
    const handleChange=(e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement >)=>
    {
        setUserFilter((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

  return (
    <section className='w-1/4   flex flex-col  gap-4 items-center'>

        <div className='w-[90%] flex flex-col space-y-4  py-6 px-4 justify-center mt-8 border border-gray-400 rounded-md shadow-lg'>

            <div className="group flex w-full mx-auto border border-gray-200 shadow-md px-6 py-2 rounded-md bg-white items-center">
                <i className="fa-solid fa-magnifying-glass text-gray-400 font-semibold text-md group-focus-within:text-blue-500"></i>
                <input type="text" name="search" value={userFilter.search} className=" border-none focus:outline-none text-md font-bold text-gray-600 px-2 " placeholder="search" onChange={handleChange}/>
            </div>

            <div className=" flex flex-col space-y-2">
                <div className="space-y-3">
                    <h4>Status</h4>
                    <div className="w-full bg-blue-300 h-[1px] rounded-md"></div>
                </div>

                <label><input type="radio"  name="status" className="mr-2" value="completed" checked={userFilter.status==="completed"} onChange={handleChange}/> Completed</label>
                <label><input type="radio" name="status" className="mr-2" value="pending" checked={userFilter.status==="pending"} onChange={handleChange}/>Pending</label>
                <label><input type="radio"  name="status" className="mr-2" value="notAssigned" checked={userFilter.status==="notAssigned"}onChange={handleChange}/>Not Assigned</label>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="space-y-3 flex flex-col w-full items-start">
                    <h4>Department:</h4>
                    <div className="w-full bg-blue-300 h-[1.5px] rounded-md"></div>
                </div>      

                    <select  className="w-[85%] border border-gray-300 shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 p-2  my-4" value={userFilter.department || ""} name="department" onChange={handleChange}>
                        <option value="" disabled>Select Department</option>
                        {["HR","Finance","Developer"].map((dep,index)=>( 
                        <option key={index}>
                            {dep}
                        </option>

                        ))}
                    </select>

                    <Button style={"w-full border border-gray-200 text-lg text-gray-500 font-bold rounded-md shadow-md py-2 hover:bg-gray-500 hover:text-white"} 
                    handleSubmit={()=>setUserFilter({search:"",status:"",department:""})} type={"reset"} text={"Clear"}/>
            </div>

        </div>

    </section>
  )
}
