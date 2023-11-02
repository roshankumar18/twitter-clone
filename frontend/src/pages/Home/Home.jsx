import React from 'react'
import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import RightSideBar from '../../components/RightSideBar/RightSideBar'
import { useSelector } from 'react-redux'
import SignIn from '../SignIn/SignIn'
import Timeline from '../../components/Timeline/Timeline'

const Home = () => {
    const {currentUser} = useSelector((state)=>state.user)
    
    return (
        <>
        {!currentUser?(<SignIn/>):
        (<div className='grid grid-cols-1 md:grid-cols-4'>
            <div className='px-6'>
                <LeftSideBar/>
            </div>
            <div className='col-span-2 border-x-2 border-t-slate-800 px-6'>
               <Timeline/>
            </div>
            <div className='px-6'>
                <RightSideBar/>
            </div>
            
        
        </div>)
        }
        </>
    )
}

export default Home