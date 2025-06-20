import { createColumnHelper } from "@tanstack/react-table";
import type { ColumnProps } from "../types/data";




const columnHelper=createColumnHelper<ColumnProps>()

export const columns=[
    columnHelper.accessor("id",{
        header:"ID",
        cell:(info)=>info.getValue(),
        enableSorting:true,
        enableGlobalFilter:true,
    }),
    columnHelper.accessor("name",{
        header:"Name",
        cell:(info)=>info.getValue(),
        enableSorting:true,
        enableGlobalFilter:true,
    }),
    columnHelper.accessor("email",{
        header:"Email",
        cell:(info)=>info.getValue(),
        enableSorting:true,
        enableGlobalFilter:true,
    }),
    columnHelper.accessor("department",{
        header:"Department",
        cell:(info)=>info.getValue(),
        enableGrouping:true
    }),
    columnHelper.accessor("role",{
        header:"Role",
        cell:(info)=>info.getValue(),
        enableGrouping:true
    }),
    columnHelper.accessor("assignTask",{
        id: "assignTaskCount",
        header:"AssignTaskCount",
        cell:(info)=>info.getValue()?.length ?? 0,
        enableSorting:true
    }),
    columnHelper.accessor("completedTask",{
        id: "completedTaskCount",
        header:"CompletedTaskCount",
        cell:(info)=>info.getValue()?.length ?? 0,
        enableSorting:true
    }),
    columnHelper.accessor("assignTask",{
        id: "recentAssignedDate",
        header:"RecentAssigneddDate",
        enableSorting:true,
        cell:(info)=>{
            const task=info.getValue()
            if(Array.isArray(task) && task.length>0)
            {
                const date=task[task.length-1]
                const [recentDate]= date.assignedDate.split("T")
                return recentDate
            }
            else return "not Assigned"
        }   
    }),
    columnHelper.accessor("completedTask",{
        id: "recentCompletedDate",
        header:"RecentCompletedDate",
        enableSorting:true,
        cell:(info)=>{
            const task=info.getValue()
            if(Array.isArray(task) && task.length>0)
            {
                const date=task[task.length-1]
                const [recentDate]= date.completedDate.split("T")
                return recentDate
            }
            else return "not Completed"
        }   
    })
]