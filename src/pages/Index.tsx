import React, { useState } from 'react'
import TopNav from '../component/TopNav'
import { Outlet } from 'react-router-dom'



export default function NewSchool() {

    

  

  return (
    <>
        <TopNav /> 
        <Outlet />
    </>
  )
}
