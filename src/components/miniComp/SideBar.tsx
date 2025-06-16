import React, { useState } from 'react'
import type { SideBarProps } from '../../types/data'

export default function SideBar({setFilter,filter}:SideBarProps) {
 

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFilter((prev) => ({
            ...prev, [name]: value
        }))
    }
   
    return (
       
        <section className='w-1/4 h-1/2 flex flex-col items-center justify-center '>
      <div className='w-[90%] flex flex-col gap-4 border-[1px] border-gray-400 rounded-lg shadow-lg p-3'>
        {/* Radio Buttons aligned to start */}
        <div className='w-full flex flex-col gap-2 self-start'>
            <div className='w-full my-3'>
                <p className='w-full text-lg font-semibold text-center  bg-gray-100 py-3 rounded-md'>Filter</p>
            <div className='h-[1px] my-2 w-full bg-blue-500 rounded-lg'></div>
            </div>
          <label className='font-medium text-lg font-serif flex items-center gap-2'>
            <input
              type='radio'
              name='type'
              value='solved'
              checked={filter.type === 'solved'}
              className='accent-green-600'
              onChange={handleChange}
            />
            Solved
          </label>
          <label className='font-medium text-lg font-serif flex items-center gap-2'>
            <input
              type='radio'
              name='type'
              value='unSolved'
              checked={filter.type === 'unSolved'}
              className='accent-red-500'
              onChange={handleChange}
            />
            UnSolved
          </label>
        </div>

        
        <input
          type='date'
          name='date'
          className='w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md shadow-md p-2 border border-gray-400'
          onChange={handleChange}
        />

        
        <button className='w-full border border-gray-300 text-md font-semibold py-2 text-center hover:bg-gray-500 hover:text-white rounded-md shadow-md' onClick={() => setFilter({ type: 'unSolved', date: null }) }>Clear</button>
      </div>
    </section>
    )
}

