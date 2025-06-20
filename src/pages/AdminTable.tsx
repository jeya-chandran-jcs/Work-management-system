import { useQuery } from "@tanstack/react-query";
import Table from "../components/adminComp/Table";
import { getData } from "../Api/getData";
import { API } from "../global";
import type { UserProps } from "../types/data";


export default function AdminTable() {
    
    const {data,isLoading,error}=useQuery({
        queryKey:["table"],
        queryFn:()=>getData(API)
    })
    if(!data) return
  
    const employeeUser=data.filter((user:UserProps)=>user.role!=="admin")

    return (
    <div className="h-screen">
        <Table  employee={employeeUser} isLoading={isLoading} error={error}/>
    </div>
  )
}
