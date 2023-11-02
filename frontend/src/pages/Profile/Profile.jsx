import React from 'react'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'

const Profile = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4'>
        <div className='px-6'>
            <LeftSideBar/>
        </div>
        <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
            Profile
        </div>
    </div>
  )
}

export default Profile