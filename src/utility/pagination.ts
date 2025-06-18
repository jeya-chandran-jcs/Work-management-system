import type { Paginationts } from "../types/data"

export function pagination<T>({length,itemsPerPage,currentPage,filteredTask}:Paginationts<T>):T[]{
    

    const totalPages=Math.ceil(length/itemsPerPage)
    const currentTasks=filteredTask.slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage)
     console.log("curretn tasks",totalPages)
     return currentTasks
}

