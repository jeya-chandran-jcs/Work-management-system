import { useReactTable, getCoreRowModel, flexRender, getSortedRowModel,getFilteredRowModel,type SortingState } from "@tanstack/react-table"
import { columns } from "../../utility/column"
import type { ColumnProps, TableProps } from "../../types/data"
import "../../styles/Table.css"
import { useState } from "react"
import Input from "../base/Input"


export default function Table({ employee, isLoading, error }: TableProps) {
    const [sorting,setSorting]=useState<SortingState>([])
    const [grouping,setGrouping]=useState<string[]>([])
    const [globalFilter,setGlobalFilter]=useState("")

  console.log(isLoading)
    console.log(error)

    const table = useReactTable<ColumnProps>({
        data: employee,
        columns,
        state:{
            sorting,
            grouping,
            globalFilter
        },
        onSortingChange:setSorting,
        onGroupingChange:setGrouping,
        onGlobalFilterChange:setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel:getSortedRowModel(),
        getFilteredRowModel:getFilteredRowModel()

    })

    const handleSortChange=(e:React.ChangeEvent<HTMLSelectElement>)=>
    {
        const col=e.target.value
        setSorting(col ? [{id:col,desc:false}] : [])
    }


    const handleGroupChange=(e:React.ChangeEvent<HTMLSelectElement>)=>
    {
        const col=e.target.value
        setGrouping(col ? [col] : [])
    }

    return (
        <div className="flex flex-col items-center min-h-screen pt-10 gap-4">

        <div className="flex gap-4 items-center justify-between w-[90%] mx-auto border border-gray-300 shadow-md px-6 py-4 rounded-lg">
            <Input name={"globalFilter"} type={"text"} id={"globalFilter"} placeHolder={"Search by ID, Name, Email"} style={"px-4 py-2 bg-white rounded-lg border border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:bg-green-50 focus:ring-2 focus:ring-green-300 focus:border-none"} 
                value={globalFilter} handleChange={(e)=>setGlobalFilter(e.target.value)}/>

            <div className="flex gap-4">
                
                <select className="p-2 bg-white rounded-lg border border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-none" onChange={handleSortChange} defaultValue="">
                    <option value="">Sort By</option>
                    <option value="id">ID</option>
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="assignTask">No of Task Assigned</option>
                    <option value="completedTask">No of Task Completed</option>
                </select>

                <select className="p-2 bg-white rounded-lg border border-gray-400 text-lg font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-green-300  focus:border-none" onChange={handleGroupChange} defaultValue="">
                    <option value="">Group By</option>
                    <option value="department">Department</option>
                    <option value="role">Role</option>
                </select>

            </div>
        </div>

            <div className="w-[90%] rounded-lg border border-gray-300 overflow-hidden shadow-lg">
                <table className="w-full border-collapse  ">
                <thead className="border-b border-green-400 shadow-md  py-3">
                    {table.getHeaderGroups().map((headerGroup)=>(
                        <tr key={headerGroup.id} className="">
                            {headerGroup.headers.map((header)=>(
                                <th key={header.id} className={`py-4 px-4 text-center cursor-pointer text-gray-600 select-none transition duration-200 hover:bg-green-50 
                                    ${header.column.getIsSorted() ? "text-blue-600 font-semibold" : ""}`}
                                    onClick={header.column.getToggleSortingHandler()}>
                                        <div className="flex items-center justify-center">
                                            {flexRender(header.column.columnDef.header,header.getContext())}
                                            <i className="fa-solid fa-arrows-up-down pl-3"></i>
                                        </div>
                           
                                </th> 
                            ))}
                        </tr>
                    ))}
                </thead>

                <tbody className="text-center">
                    {table.getRowModel().rows.length===0 ? 
                    (
                        <tr>
                            <td colSpan={columns.length} className="py-6 text-lg text-gray-500">
                                No users found.
                            </td>
                        </tr>
                    )
                    :
                    (
                         table.getRowModel().rows.map((row)=>
                        (
                            <tr key={row.id} className="hover:bg-green-50 border border-b">
                                {row.getVisibleCells().map((cell)=>(
                                    <td key={cell.id} className="py-4 px-3">
                                        {flexRender(cell.column.columnDef.cell,cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        )
                    )
                    )}
                </tbody>
            </table>
            </div>
        </div>
    )
}