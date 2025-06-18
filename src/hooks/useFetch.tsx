import {  useEffect, useState } from 'react'
import type { User } from '../types/data'

export default function useFetch(url:string) {
 const [data,setData]=useState<User | null>(null)
 const [loading,setLoading]=useState<boolean>(false)
 const [error,setError]=useState<string>("")
 
 

 useEffect(()=>{
    const getData=async()=>{
    try{
        setLoading(true)
        const response=await fetch(url)
        const result=await response.json()
        setData(result)
        setLoading(false)
    }
    catch(err:unknown){
        if(err instanceof Error)
        {
            setError(err.message)
        }
        setLoading(false)
    }
 } 
 getData()
 },[url])

return {data,loading,error}
}

