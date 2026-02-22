import React from 'react'
import SideNav from './_components/SideNav'

export default function DashboardPage () {
  return (
    <div>
        <div className="md:w-64 fixed">
            <SideNav />
        </div>

        <div className="md:ml-64" >
            Dashboard
        </div>
    </div>
  )
}
