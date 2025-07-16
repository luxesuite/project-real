'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import { FaSave, FaSpinner } from 'react-icons/fa';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { appDispatch, RootState } from '@/store';
import Loader from '@/components/Loader';
import { updateUsers } from '@/store/admin-slices/allUsers';
import { openModal } from '@/store/slices/modalSlice';
import BtnLoader from '../../../../../../utils/BtnLoader';

type PurchaseData = {
  username: string,
  amount: number| string,
  name:String,
  date:String
};

 const page = ()=> {
  const router = useRouter();
   const [loading,setLoading] = useState(false)

  const [formData, setFormData] = useState<PurchaseData>({
    username: '',
    amount: 0,
    name:"",
    date:new Date().toLocaleString()
  });
  const [errorState, setErrorState] = useState({
    message:"",
    status:false
  });

const dispatch = useDispatch<appDispatch>()
  const allUsersState: any[] | null = useSelector((state:RootState)=>{
  
  return state.allUsersReducer
  })


  
  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
        return
    }
    if (!formData.username || !formData.amount) {
     dispatch(openModal("Empty field"))
      return;
    }
    // console.log('Form submitted:', formState);
    try {
        setLoading(true)
        const res = await fetch("/api/admin/deposit",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formData)
        })
        if (!res.ok) {
            dispatch(openModal("something went wrong please try again later"))
            setLoading(false)
            return
        }
        const response = await res.json()
        
        if (!response.success) {
            
            dispatch(openModal(response.message))
            setLoading(false)
            
            return
        }
        
        
        
        setLoading(false)
        dispatch(openModal(response.message))
} catch (error) {
    
    dispatch(openModal("sorry,something went wrong"))
    setLoading(false)
    }
  
  };




  useEffect(()=>{
console.log(formData);

  },[formData])
    const fetchUsers = async()=>{
const res = await fetch("/api/admin/get-all-users")
if (!res.ok) {
alert("Something went wrong, couldnt get users")
return
}

const response = await res.json()
// console.log(response);
if (response.success) {
    
    dispatch(updateUsers(response.data))
}
else{
    setErrorState({status:true,message:response.message})
}
return
    }

    useEffect(()=>{
        if (allUsersState) {
            return
        }
fetchUsers()
    },[])


  const handleUserChange = (selectedOption: any) => {
    const userObject = allUsersState?.find(item => item.username == selectedOption.username)
    // console.log(selectedOption);
// console.log(userObject);
    setFormData((prev) => {



        return {
      ...prev,
      username: selectedOption?.username || '',
      name:userObject.name
    }
    });
  };




//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.username || !formData.amount) {
//      dispatch(openModal("Empty field"))
//       return;
//     }


//   };

if (errorState.status) {
    return <div>
        <p className='text-center'>
        {errorState.message ? errorState.message : "something went wrong"}
        </p>
        {/* <button onClick={}>please reload</button> */}
    </div>
}

  if (allUsersState == null ) {
    return <div className='flex items-center justify-center my-16 flex-col gap-2'>
        <Loader/>
        <h1>Loading</h1>
        </div>
  }

  if (allUsersState.length < 1 ) {
      return <div className='flex items-center justify-center my-16 flex-col gap-2'>
        <h1>No user in the data base to add deposit</h1>
        </div>
  }
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow mt-6">
      <h1 className="text-2xl font-bold mb-6">Add Deposit</h1>
      
      {/* {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )} */}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          
 <Select
            id="user"
        options={allUsersState.map(item => {
        return {username:item.username,label:item.username}
        })}
        value={allUsersState.map(item => {
        return {username:item.username,label:item.username}
        }).find((option:any) => {
        return option.username == formData.username
        })}
            onChange={handleUserChange}
            placeholder="Select a user..."
            isSearchable
            className="basic-single"
            classNamePrefix="select"
            required
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#d1d5db',
                minHeight: '42px',
                '&:hover': { borderColor: '#d1d5db' },
                boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999
              })
            }}
          />
      
        </div>

        <div className="mb-6">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={(e)=> {
setFormData({...formData,amount:e.target.value})
            }}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            
            className="flex items-center px-4 py-2 bg-primary text-white rounded  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {loading ? (
              <>
               <BtnLoader/>
              </>
            ) : (
              <>
                Save
              </>
            )}
            {/* save */}
          </button>
        </div>
      </form>
    </div>
  );
}

export default page