"use client"
import { appDispatch, RootState } from '@/store'
import { updateUsers } from '@/store/admin-slices/allUsers'
// import { updateUsers } from '@/store/slices/allUsersSlice'
import { useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const domainAddress = process.env.NEXT_PUBLIC_DOMAIN_ADDRESS

const fetchUsers = async ()=>{
    const res = await fetch(`${domainAddress}/api/admin/get-all-users`
    //     {
    //     method:"GET",
    //     headers:{
    //         Authorization:""
    //     }
    // }
)
    
    return res.json()
}
const ListAllUsers = () => {
    const dispatch = useDispatch<appDispatch>()
const allUsers = useSelector((store:RootState)=>{
    return store.allUsersReducer
})
    const {data,isLoading,isError,error} = useQuery({
        queryKey:["users"],
        queryFn:fetchUsers
    })

    useEffect(()=>{
        if (isLoading === false && !data) {
            console.log(data);
            
            dispatch(updateUsers(data))
        }
        console.log(isLoading);
        console.log(data);
        

    },[isLoading])


  return (
    <div>
{isLoading && (
     <div>
            Loading Users
        </div>
)}

{
    isLoading == false && <section>
        userlist
    </section>

}
    </div>
  )
}

export default ListAllUsers