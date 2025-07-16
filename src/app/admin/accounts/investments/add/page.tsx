"use client"
import Loader from '@/components/Loader';
import { appDispatch, RootState } from '@/store';
import { updateUsers } from '@/store/admin-slices/allUsers';
import { openModal } from '@/store/slices/modalSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import BtnLoader from '../../../../../../utils/BtnLoader';

interface User {
  username: string;
  label: string;
}

interface FormState {
name:string,
username: string;
plan: string;
amount:number;
profitReturn: number;
confirmed:string,
date:string
}

const page = () => {
  // Dummy data for users
  const users: User[] = [
    { username: 'john_doe', label: 'john_doe' },
    { username: 'jane_smith', label: 'jane_smith' },
    { username: 'mike_johnson', label: 'mike_johnson' },
    { username: 'sarah_williams', label: 'sarah_williams' },
    { username: 'david_brown', label: 'david_brown' },
    { username: 'emily_davis', label: 'emily_davis' },
    { username: 'robert_miller', label: 'robert_miller' },
    { username: 'lisa_wilson', label: 'lisa_wilson' },
    { username: 'thomas_moore', label: 'thomas_moore' },
    { username: 'jennifer_taylor', label: 'jennifer_taylor' },
    { username: 'william_anderson', label: 'william_anderson' },
    { username: 'michelle_thomas', label: 'michelle_thomas' },
  ];
  const [options,setOptions] = useState<any>(null)
  const [loading,setLoading] = useState(false)
const dispatch = useDispatch<appDispatch>()
  const allUsersState: any[] | null = useSelector((state:RootState)=>{
  
  return state.allUsersReducer
  })
  // Notification types now directly use their string values
  const planTypes = [
    { value: 'starter', label: 'starter' },
    { value: 'gold', label: 'gold' },
    { value: 'professional', label: 'professional' },
    { value: 'diamond', label: 'diamond' },
    { value: 'promotion', label: 'promotion' },
  ];

  // Read status options
  const confirmedStatusOptions = [
    { value: 'yes', label: 'yes' },
    { value: 'no', label: 'No' },
    // { value: 'unknown', label: 'Unknown' },
  ];



  const [formState, setFormState] = useState<FormState>({
    name:"",
    username: '',
    profitReturn: 0,
    amount:0,
    confirmed:"no",
    plan:"",
    date:new Date().toLocaleString()
  })
// const now = new Date();
// const formatted = now.toLocaleString(); 
// console.log(formatted);

  // const handleUserChange = (selectedOption: User | null) => {
  //   setFormState(prev => ({
  //     ...prev,
  //     username: selectedOption?.username || ''
  //   }));
  // };

    const handleUserChange = (selectedOption: any) => {
    const userObject = allUsersState?.find(item => item.username == selectedOption.username)
    // console.log(selectedOption);
// console.log(userObject);
    setFormState((prev) => {



        return {
      ...prev,
      username: selectedOption?.username || '',
      name:userObject.name
    }
    });
  };


  useEffect(()=>{
console.log(formState);

  },[formState])
  const handlePlanChange = (selectedOption: {value: string, label: string} | null) => {
    setFormState(prev => ({
      ...prev,
      plan: selectedOption?.value || ''
    }));
  };

  const handleReadStatusChange = (selectedOption: {value: string, label: string} | null) => {
    setFormState(prev => ({
      ...prev,
      confirmed: selectedOption?.value || ''
    }));
  };

  // const handleDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setFormState(prev => ({
  //     ...prev,
  //     details: e.target.value
  //   }));
  // };

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    if (loading) {
        return
    }

    if (!formState.date || !formState.username || !formState.amount || !formState.profitReturn || !formState.plan || !formState.name || !formState.confirmed) {
        alert("empty field please, fill the empty field")
        setLoading(false)
        return;
    }
    console.log('Form submitted:', formState);
    try {
        setLoading(true)
        const res = await fetch("/api/admin/investment",{
            method:"POST",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify(formState)
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
    
    dispatch(openModal("sorry something went wrong"))
    setLoading(false)
    }
  
  };

// Fetch users


    const fetchUsers = async()=>{
const res = await fetch("/api/admin/get-all-users")
if (!res.ok) {
alert("Something went wrong, couldnt get users")
return
}

const response = await res.json()
console.log(response);

dispatch(updateUsers(response.data))
return
    }

    useEffect(()=>{
        if (allUsersState) {
            return
        }
fetchUsers()
    },[])

//   useEffect(()=>{
// console.log(allUsersState.length);
// console.log(allUsersState);

// if (allUsersState.length > 0) {
    
//     setOptions(()=>{
// const map= allUsersState.map(item => {

    
//    return {username:item.username,label:item.username}
// })

// return map
//     })
// }

//   },[allUsersState])

  if (allUsersState == null ) {
    return <div className='flex items-center justify-center my-16 flex-col gap-2'>
        <Loader/>
        <h1>Loading</h1>
        </div>
  }
  if (allUsersState.length < 1  ) {
    return <div className='flex items-center justify-center my-16 flex-col gap-2'>
        {/* <Loader/> */}
        <h1>No user in the database to add investment for</h1>
        </div>
  }
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">Investment Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Dropdown with Search */}
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-700 mb-1">
            User
          </label>
          <Select
            id="user"
        options={allUsersState.map(item => {
        return {username:item.username,label:item.username}
        })}
        value={allUsersState.map(item => {
        return {username:item.username,label:item.username}
        }).find((option:any) => {
        return option.username == formState.username
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

        {/* Notification Type Dropdown */}
        {/* <div>
          <label htmlFor="notificationType" className="block text-sm font-medium text-gray-700 mb-1">
            Notification Type
          </label>
          <Select
            id="notificationType"
            options={notificationTypes}
            value={notificationTypes.find(type => type.value === formState.plan)}
            onChange={handleNotificationChange}
            placeholder="Select notification type..."
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
        </div> */}


        {/* Amount Input */}

        <div>
            <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input 
          
          type="number" 
          className='min-h-[35px] border-[#d1d5db] border-1'
          onChange={(e)=> setFormState({...formState,amount:Number(e.target.value) })}
          />
        </div>
        {/* Plan */}
 <div>
          <label htmlFor="planType" className="block text-sm font-medium text-gray-700 mb-1">
            Select plan
          </label>
          <Select
            id="planType"
            options={planTypes}
            value={planTypes.find(type => type.value === formState.plan)}
            onChange={handlePlanChange}
            placeholder="Select plan type..."
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

{/* Profit return */}

        <div>
            <label htmlFor="" className="block text-sm font-medium text-gray-700 mb-1">
            Profit Return
          </label>
          <input
          type="number" 
          className='min-h-[35px] border-[#d1d5db] border-1'
           onChange={(e)=> setFormState({...formState,profitReturn:Number(e.target.value) })}
          />
        </div>


        {/* Read Status Dropdown */}
        <div>
          <label htmlFor="read" className="block text-sm font-medium text-gray-700 mb-1">
            Confirmed Status
          </label>
          <Select
            id="read"
            options={confirmedStatusOptions}
            value={confirmedStatusOptions.find(status => status.value === formState.plan)}
            onChange={handleReadStatusChange}
            placeholder="Select read status..."
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

       
        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
           
           {loading ? <BtnLoader/> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;