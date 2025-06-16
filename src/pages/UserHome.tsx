import { useState } from 'react'
import UserCard from '../components/userComp/UserCard'
import SideBar from '../components/miniComp/SideBar'
import type {  SideBarType} from '../types/data'

export default function UserHome() {
   const [filter, setFilter] = useState<SideBarType>({ type: "unSolved", date: null })

  return (
    <div className='w-full h-screen flex'>
      <SideBar setFilter={setFilter} filter={filter}/>
        <UserCard filter={filter}/>
    </div>
  )
}
