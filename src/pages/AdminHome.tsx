import  { useState } from 'react'
import Card from '../components/miniComp/Card.tsx'
import AdminSideBar from '../components/miniComp/AdminSideBar.tsx'
import type { AdminFilter } from '../types/data.ts'

export default function AdminHome() {
  const [userFilter,setUserFilter]=useState<AdminFilter>({search:"",status:"",department:""})

  return (
    <div className='w-full flex '>
      <AdminSideBar userFilter={userFilter} setUserFilter={setUserFilter}/>
            <Card userFilter={userFilter} />
    </div>
  )
}
