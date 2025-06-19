import type { PaginationProps } from "../../types/data"
import Button from "../base/Button"


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
        <Button style={`px-3 py-2  text-white font-bold text-md rounded-md ${currentPage===1? `bg-gray-300 text-gray-100 cursor-not-allowed` : `bg-green-400`}`}
        handleSubmit={handlePrev} text={"Prev"} type={"button"} disabled={currentPage===1}/>

        <span className="text-green-700 font-bold text-lg ">{currentPage}</span>

        <Button style={`px-3 py-2  text-white font-bold text-md rounded-md ${currentPage===totalPages ? `bg-gray-300 text-gray-100 cursor-not-allowed` : `bg-green-400`}`}
        handleSubmit={handleNext} text="Next" type={"button"} disabled={currentPage===totalPages}/>
    </div>
  )
}
