import React from 'react'
import TopNav from '../component/TopNav'
import DataGrids from '../component/table/DataGrids'

export default function AllSchool() {
  return (
   <>
    <TopNav /> 
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">All School</h1>
          </div>
        </header>
        <div className="p-3 ">
       <DataGrids /> 
        </div>
   </>
  )
}
