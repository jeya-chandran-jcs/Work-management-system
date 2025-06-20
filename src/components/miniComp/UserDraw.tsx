import { useEffect, useState } from 'react'
import "../../styles/MenuDraw.css"
import { auth } from '../../googleSignIn/config'
import { onAuthStateChanged,signOut } from 'firebase/auth'
import { useNavigate } from '@tanstack/react-router'
import Button from '../base/Button'

export default function UserDraw() {

 
    const [name,setName]=useState<string | null>(null)
    const [email,setEmail]=useState<string | null>(null)
    const navigate=useNavigate()
    const handleLogin=async()=>{
        navigate({to:"/login"})
        console.log("signed in successfully")

    }

    const handleLogout=async()=>{
        try{
            console.log("logout")
            await signOut(auth)
            sessionStorage.removeItem("user")
            console.log("logout")
            navigate({to:"/login",replace:true})
        console.log("logout successfullt")
        }
        catch(err)
        {
            console.error(err)
        }
    }

useEffect(()=>{
    const userNameGet=onAuthStateChanged(auth,(user)=>{
        console.log("user",user)
        if(user)
        {
            setName(user?.displayName)
            setEmail(user?.email)
        }
        else{
            setName(null)
            setEmail(null)
        }
    })
    
    return ()=> userNameGet()
},[])
    
  return (
    <div className=' w-2/4 bg-white  border-2 border-gray-400 shadow-lg shadow-gray-400 rounded-md '>
           <ul className='flex w-full flex-col  justify-start px-3 py-2 gap-3'>
                <li className='text-black'>
                    {name && <p>Name:  {name}</p>}
                </li>
                <li className='text-black'>
                    {email && <p>Email: {email}</p>}
                </li> 
                <li className='text-black'>
                    {name ? (
                        <Button handleSubmit={handleLogout} style={"w-full px-3 rounded font-bold text-lg bg-red-500 text-white "}
                        text={"LogOut"} type={"submit"}/>
                        ) : (
                        <Button handleSubmit={handleLogin} style={"w-full px-3 rounded font-bold text-lg bg-green-500 text-black"}
                        text={"Login"} type={"submit"}/>
                        )}                   
                </li>

           </ul> 
    </div>
  )
}
