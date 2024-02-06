import React, { useEffect, useState } from 'react'
import users from '../assets/img/team.png'
import employees from '../assets/img/hired.png'
import notes from '../assets/img/note.png'

function DashboardPage() {
  const [userdata, setuserdata] = useState()
  const [notedata, setnotedata] = useState()
  const [employeedata, setemployeedata] = useState();

  const getLen = async ()=>{
    let result1 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user-count`);
    result1 = await result1.json();
    setuserdata(result1.length)

    let result2 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/note-count`);
    result2 = await result2.json();
    setnotedata(result2.length)

    let result3 = await fetch(`${process.env.REACT_APP_BACKEND_URL}/employee-count`)
    result3 = await result3.json();
    setemployeedata(result3.length)
  }

  useEffect(() => {
    getLen();
  }, [])

  return (
    <div className='dashboardPage dashboardRender '>
      <div className="box-container d-flex flex-column">
      <div className="dashboardBox">
        <h2>{userdata} Viewers have been registered!</h2> 
        <img src={users} alt="" />
      </div>

      <div className="dashboardBox">
        <h2>{employeedata} Editors have been working!</h2> 
        <img src={employees} alt="" />
      </div>
      
      <div className="dashboardBox">
        <h2>{notedata} Notes have been published!</h2> 
        <img src={notes} alt="" />
      </div>
      </div>
    </div>
  )
}

export default DashboardPage