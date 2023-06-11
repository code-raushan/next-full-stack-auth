import Authenticated from '@/components/Authenticated'
import React from 'react'
import DashboardPage from '@/components/DashboardPage'

export default async function Dashboard() {
  return(
    <>
      
    <Authenticated redirectTo='/login'>
      {/* @ts-expect-error Server Component */}
      <DashboardPage/>
    </Authenticated>
    </>
    
  )
}