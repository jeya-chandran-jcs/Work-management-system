import { useState } from "react"
import { API } from "../../global"
import type { AdminFilterProps, User, UserProps } from "../../types/data"
import Modal from "./Modal"
import { useQuery } from "@tanstack/react-query"
import { getData } from "../../Api/getData"
import { pagination } from "../../utility/pagination"
import Pagination from "./Pagination"


export default function Card({userFilter}:Pick<AdminFilterProps, "userFilter">) {
    const [selectedUser,setSelectedUser]=useState<UserProps | null>(null)
    const {data,isLoading,error}=useQuery({
        queryKey:["allUsers"],
        queryFn:()=>getData(API)
    })
    const [currentPage,setCurrentPage]=useState<number>(1)
    const itemsPerPage:number=6

    if(!data)
    {
        return
    }
    if(isLoading) console.log(isLoading,"from admin")
      if(error) console.log("from admin card" ,error)

        
  const filteredData=data.filter((item:User)=>item.role!=="admin")

  const filterdUser=filteredData.filter((user:UserProps)=>{
    const searchUser=userFilter.search?.toLowerCase() || ""
    const matchedUser=user.name.toLowerCase().includes(searchUser) || user.email.toLowerCase().includes(searchUser)

    const matchedDepartment=!userFilter.department || userFilter.department.toLowerCase()===user.department.toLowerCase()

    const matchesStatus = userFilter.status === "" ? true : userFilter.status === "notAssigned"
        ? user.assignTask.length === 0 : userFilter.status === "pending"
        ? user.assignTask.length > 0 && user.completedTask.length === 0 : userFilter.status === "completed"
        ? user.completedTask.length > 0 : false;

    return matchedDepartment && matchedUser && matchesStatus
  })



const handleAssignTask=(user:UserProps)=>{
    setSelectedUser(user)

}

const handleCloseModal=()=>{
    setSelectedUser(null)
}

  const length:number=filterdUser?.length
  const page=pagination(length,itemsPerPage,currentPage,filterdUser)
  const totalPages=Math.ceil(filterdUser.length/itemsPerPage)
  console.log("total pages",totalPages)

return (
 <main className="w-full min-h-screen bg-gray-100 p-4">
  <section className="w-full flex flex-wrap justify-between gap-y-6">
    {filterdUser.length > 0 ? (
      page.map((user:UserProps) => (
        <div
          key={user.id}
          className="w-[48%] bg-white rounded-2xl shadow-xl border border-gray-200 hover:shadow-2xl transition duration-300 p-6 flex flex-col justify-between"
        >
          {/* Top Section */}
          <div className="flex gap-6">
            {/* Profile Image (1/4 width) */}
            <div className="w-1/4 flex justify-center items-center">
  <img
    src="https://img.freepik.com/premium-photo/software-engineer-digital-avatar-generative-ai_934475-8997.jpg?w=2000"
    alt={user.name}
    className="w-40 h-40 rounded-full object-cover border-4 border-green-500"
  />
</div>

            {/* User Info (3/4 width) */}
            <div className="w-3/4 flex flex-col justify-between">
              <div className="mt-3">
                <h2 className="text-2xl font-semibold text-gray-800">{user.name}</h2>
                <div className="w-full h-[2px] bg-black my-2 rounded"></div>
                <p className="text-md text-gray-600">{user.department}</p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-gray-600 rounded-md shadow-md border-2 border-blue-300 p-3">
                  <i className="fa-regular fa-envelope text-blue-500"></i>
                  <span className="text-sm break-all">{user.email}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600 rounded-md shadow-md border-2 border-green-300 p-3">
                  <i className="fa-solid fa-briefcase text-green-500"></i>
                  <span className="text-sm">{user.role}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex justify-between items-center mt-6">
            <p className="text-md font-semibold text-gray-600">
              Status:
              <span className="ml-2 text-blue-600 capitalize">
                {user.assignTask.length === 0
                  ? "Not Assigned"
                  : user.completedTask.length > 0
                  ? "Completed"
                  : "Pending"}
              </span>
            </p>
            <button
              className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition duration-200"
              onClick={() => handleAssignTask(user)}
            >
              Assign
            </button>
          </div>
        </div>
      ))
    ) : (
      <p className="text-gray-500 text-lg font-semibold mt-6">No users found</p>
    )}
  </section>
   {selectedUser && 
           <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50"> 
                 <Modal name={selectedUser.name} id={String(selectedUser.id)} department={selectedUser.department} onClose={handleCloseModal} keyMessage={"assignTask"}/>
           </div>
        }


  {/* Pagination Centered */}
  {filterdUser.length > 0 && (
    <div className="w-full flex justify-center mt-10">
      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  )}
</main>

);
 
}
