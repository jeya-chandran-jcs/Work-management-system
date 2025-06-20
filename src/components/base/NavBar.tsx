import  { useEffect, useState } from 'react'
import { auth } from '../../googleSignIn/config'
import UserDraw from '../miniComp/UserDraw'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from '@tanstack/react-router'

export default function NavBar() {
    const [userShow,setUserShow]=useState<boolean>(false)
    const [letter,setLetter]=useState<string | null>(null)
    const navigate=useNavigate()

    
    useEffect(()=>{
        const first=onAuthStateChanged(auth,(user)=>{
            setLetter(user?.displayName ? user.displayName.split("")[0] : null)
        })
        // console.log(letter ," from nav")
        return ()=>first()
    })
    const admin=sessionStorage?.getItem("user")

    const handleNavigate=()=>{
        if(admin==="admin")  navigate({to:"/admin-home"})
        else if(admin==="employee")  navigate({to:"/user-home"})
    }

  return (
    <nav className='w-full flex justify-around items-center py-3  bg-white backdrop-blur-md top-0 shadow-md z-50' onMouseLeave={()=>setUserShow(false)}>
      
        <div className='flex items-center justify-center  w-full '>
            <img  onClick={handleNavigate} src="https://th.bing.com/th/id/R.c84102556606a346c0ddcafbee4ecb73?rik=1QDP1j7PCQzwxA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fteamwork-transparent-background%2fteamwork-transparent-background-23.png&ehk=5NyTHXOsWiBMprJhWu4mlAztWrqR%2fqYgM3TXFzBeZXc%3d&risl=&pid=ImgRaw&r=0" 
                className='w-16 h-10 object-contain inline-block cursor-pointer'/>
            <h1 className='font-sans text-xl font-bold inline cursor-pointer' onClick={handleNavigate}>Work <span className='text-green-600 font-extrabold text-2xl'>Stack</span></h1>   
       </div>
       
        <ul className='flex items-center justify-center gap-4 w-full'>
            <li className='text-gray-700 font-bold text-md' ><a href="/admin-table">Directory</a></li>
            <li className='text-gray-700 font-bold text-md'>Dashboard</li>
           
        </ul>

        <div className='flex items-center justify-center gap-4 w-full  '>
            <p className=''>card</p>
            <div className='bg-blue-400 rounded-full w-8 h-8 flex justify-center items-center relative group' onMouseEnter={()=>setUserShow(true)} >
                 <p className=' font-bold text-2xl'>{letter}</p>
                {userShow && (
                    <div className='absolute top-9 w-[600px] right-[-4rem] mt-2 z-50 flex justify-end ' >
                    <UserDraw />
                    </div>
                )} 
            </div>
            
        </div>
            
    </nav>
  )
}
