import React from 'react'

export default function Footer() {
  return (
    <div className='w-full bg-black flex flex-col items-center gap-2 bottom-0'>
        
        <div className='bg-gray-500 w-full flex justify-around items-center'>
            <h3 className='text-white font-bold font-sans'>Swift Deals, Silent Savings</h3>
            <ul className='flex items-center gap-2 '>
                <li><i className="fa-brands fa-instagram"></i></li>
                <li><i className="fa-brands fa-facebook"></i></li>
                <li><i className="fa-brands fa-square-x-twitter"></i></li>
                <li><i className="fa-solid fa-phone-volume"></i></li>
            </ul>
        </div>
        <div className='bg-blue-200'>

        </div>
    </div>
  )
}
