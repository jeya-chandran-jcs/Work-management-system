export const postData=async({url,data}:{url:string,data:any})=>{
    const response=await fetch(url,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(data)
    })
    if(!response.ok) throw new Error("error while posting data")
        return response.json()
}  