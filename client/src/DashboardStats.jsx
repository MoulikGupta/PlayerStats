import React, { useEffect, useState} from 'react'
import TopGameCard from './components/TopGameCard.jsx'
import DropdownCategory from './components/DropdownCategory.jsx'
import App from './App.jsx'
import UserHeader from './components/UserHeader.jsx'
import "./css/dashboardmain.css"
import PlayerSearch from './components/PlayerSearch.jsx'
import "./css/dropdowncategory.css"
import "./css/bg-effect.css"

export default function DashboardStats({ onLogout, userProfile, signIn }) {
    const [showHeading, setShowHeading] = useState(false);
    
   
    useEffect(() => {
        setShowHeading(true);
    }, []);
    
    return (
        <>
        <div className="area" >
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className="dashboardmain">
          <UserHeader onLogout={onLogout}/>
          <div className='main-cont'>
            <div className="hero-cont">
              <span className="head-cont">
                <h1 className={`heading-main ${showHeading ? 'animate-heading' : ''}`}>
                  Player Stats Viewer
                </h1>
              </span>
              <div className='top-player-cont'>
                  <DropdownCategory/>
                  <TopGameCard/>
              </div>
            </div>
            <div className='list-player'>
              <PlayerSearch/>
            </div>
          </div>
        </div>
        </>
    )
}