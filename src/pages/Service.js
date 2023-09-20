import React from 'react'
import { Outlet } from 'react-router-dom'

function Service() {
  return (
    <>
    {/* 2라우터 연결을 위해 Outlet 써주어야함 */}
    <Outlet />
    </>
  )
}

export default Service