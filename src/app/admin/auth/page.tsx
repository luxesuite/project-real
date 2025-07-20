import { redirect } from 'next/navigation'
import React from 'react'

 const page = () => {
    redirect("/admin")
  return (
    <div>page</div>
  )
}
export default page