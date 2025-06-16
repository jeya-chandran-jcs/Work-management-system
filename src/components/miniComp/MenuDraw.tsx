import React from 'react'
import "../../styles/MenuDraw.css"

export default function MenuDraw() {
  return (
    <div className='h-32 w-1/2  bg-black border-2 border-white shadow shadow-gray-400 rounded-md flex justify-center items-center'>
           <ul className='flex w-full flex-col items-center px-3 py-2 gap-3'>
                <li className='text-white'>
                    productss
                </li>
                <li className='text-white'>
                    About
                </li> 
                <li className='text-white'>
                    About
                </li>

           </ul> 
    </div>
  )
}
