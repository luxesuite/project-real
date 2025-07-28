"use client";

import { useState, FormEvent } from 'react';

import { openModal } from '@/store/slices/modalSlice';
import { useMutation } from '@tanstack/react-query';
import { addUserInfo } from '@/store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { appDispatch } from '@/store';
import { useRouter } from 'next/navigation';
import User from '@/models/userModel';

const signIn = async(formDetails:any)=>{



    const res = await fetch(`/api/sign-in`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(formDetails)
    })

    return res.json()
}

export default function SignInForm() {
 const dispatch = useDispatch<appDispatch>()
 const router = useRouter()
const mutation = useMutation({
        mutationFn:signIn,
        onSuccess:(data)=>{
                console.log(data);
                if (data.success) {
                    localStorage.setItem("token",JSON.stringify(data.token))
                    localStorage.setItem("user",JSON.stringify(data.data))
                    dispatch(addUserInfo(data.data))
                    console.log(data);
                    if (data.data.userDetails.role !== "admin") {
                      // router.push("/admin/sign-in")
                      window.alert("not an admin")
                      return
                    }
                router.push("/admin")

                return
                }
                if (data.message) {
                    dispatch(openModal(data.message))
                }

        
            },
            onError:(error)=>{
                console.log(error);
                
            }
    })
        const [formDetails,setFormDetails] = useState({
            username:"",
            password:"",
        })

    const [showPassword,setShowPassword] = useState({
        password:false,
        confirmPassword:false
    })



    const handleSubmit = (e:React.SyntheticEvent)=>{
e.preventDefault()
if (!formDetails.password || !formDetails.username) {
     dispatch(openModal("Empty field"))
         return
}

mutation.mutate(formDetails)
    }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
           Admin SignIn
          </h2>
        </div>
        
       

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
               username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="username"
                  required
                  value={formDetails.username}
                  onChange={(e) => setFormDetails({...formDetails,username:e.target.value.toLocaleLowerCase()})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
           
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                //   autoComplete="current-password"
                  required
                  value={formDetails.password}
                  onChange={(e) => setFormDetails({...formDetails,password:e.target.value})}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>



          <div>
            <button
              type="submit"
              disabled={mutation.isPending}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${mutation.isPending ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
                Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}