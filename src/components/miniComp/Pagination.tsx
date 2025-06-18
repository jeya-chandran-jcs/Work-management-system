import type { PaginationProps } from "../../types/data"


export default function Pagination({currentPage,setCurrentPage,totalPages}:PaginationProps) {
 
    const handleNext=()=>{
        if(currentPage <totalPages){
            setCurrentPage((prev)=>prev+1)
        }
    }
 
        const handlePrev=()=>{
        if(currentPage>1){
            setCurrentPage((prev)=>prev-1)
        }
    }

 
    return (
    <div className="flex justify-center items-center gap-4">
        <button className={`px-3 py-2  text-white font-bold text-md rounded-md ${currentPage===1? `bg-gray-300 text-gray-100 cursor-not-allowed` : `bg-green-400`}`} onClick={handlePrev} disabled={currentPage===1}>Prev</button>
        <span className="text-green-700 font-bold text-lg ">{currentPage}</span>
        <button className={`px-3 py-2  text-white font-bold text-md rounded-md ${currentPage===totalPages ? `bg-gray-300 text-gray-100 cursor-not-allowed` : `bg-green-400`}`} onClick={handleNext}>Next</button>
    </div>
  )
}
