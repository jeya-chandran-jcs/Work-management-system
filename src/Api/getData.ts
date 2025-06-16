export const getData=async(url:string)=>{
    const response=await fetch(url)
    if(!response.ok) throw new Error("response wasnt ok please try again")
        return response.json()
}