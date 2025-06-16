export function pagination(length,itemsPerPage,currentPage,filteredTask){

    const totalPages=Math.ceil(length/itemsPerPage)
    const currentTasks=filteredTask.slice((currentPage-1)*itemsPerPage,currentPage*itemsPerPage)
     console.log("curretn tasks",currentTasks)
     return currentTasks
}

