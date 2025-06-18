import  { useEffect, useState } from 'react'
import { auth } from '../../googleSignIn/config'
import MenuDraw from '../miniComp/MenuDraw'
import UserDraw from '../miniComp/UserDraw'
import { onAuthStateChanged } from 'firebase/auth'

export default function NavBar() {
    const [menuShow,setMenuShow]=useState<boolean>(false)
    const [userShow,setUserShow]=useState<boolean>(false)
    const [letter,setLetter]=useState<string | null>(null)

    
    useEffect(()=>{
        const first=onAuthStateChanged(auth,(user)=>{
            setLetter(user?.displayName ? user.displayName.split("")[0] : null)
        })
        // console.log(letter ," from nav")
        return ()=>first()
    })
  return (
    <nav className='w-full flex justify-around items-center py-3  bg-green-300 top-0 ' onMouseLeave={()=>setUserShow(false)}>
        <div className='flex items-center justify-center gap-2 w-full relative '>
            
            <button onClick={()=>setMenuShow(!menuShow)} className='relative'>
                <i className="fa-solid fa-bars-staggered  font-extrabold text-2xl "></i> 
                
            </button>
             {
                 menuShow && <div className='absolute w-full top-11 left-24 '><MenuDraw /></div> 
             }
            <h1 className='  font-semibold text-md'><span className='font-extrabold text-2xl text-red-400'>T</span>ask<span className=' font-bold text-lg font-serif'>Ninja</span>
            </h1>
        </div>
       
        <ul className='flex items-center justify-center gap-2 w-full'>
            <li className=''>item1</li>
            <li className=''>item1</li>
            <li className=''>item1</li>
            <li className=''>item1</li>
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
