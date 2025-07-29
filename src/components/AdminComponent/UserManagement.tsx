'use client';

import { appDispatch, RootState } from '@/store';
import { openModal } from '@/store/slices/modalSlice';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaFilter, FaUserShield, FaUser, FaChevronLeft, FaChevronRight, FaSearch, FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { postHistory } from '../../../utils/AdminUtils/AddHistory';
import { format, parse } from 'date-fns';

// type User = {
//   id: number;
//   username: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   role: 'admin' | 'user';
// };

type UserManagementProps = {
  // Props can be added here if needed
};
const deleteFunds = async(username:string)=>{
    const res = await fetch(`/api/admin/clear-user-data`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(username)


})

return res.json()
}

const UserManagement: React.FC<UserManagementProps> = () => {
    const dispatch = useDispatch<appDispatch>()
    const [historyItems,setHistoryItems] = useState<any[]>([])
      const allUsersState = useSelector((state:RootState)=>{

        return state.allUsersReducer
    })

    const mutation = useMutation({
      mutationFn:deleteFunds,
      onSuccess:(data)=>{
              console.log(data);
              if (data.success) {
         postHistory({username:data.data.username,actionPerformed:"Cleared Funds",action:"funds cleared"})
                window.location.reload()
              }
              // if (data.message) {
              //     dispatch(openModal(data.message))
              // }
              
          },
          onError:(error)=>{
              console.log(error);
              dispatch(openModal(error.message))
              
          }

    })
const router = useRouter()
   
  const [allUsers, setAllUsers] = useState<any>(dateSort(allUsersState));
  const [filteredUsers, setFilteredUsers] = useState<any>(dateSort(allUsersState));
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [selectedRole, setSelectedRole] = useState<'all' | 'admin' | 'user'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const usersPerPage = 50;

function dateSort(items:any[]){
   const sortedItems = [...items].sort((a, b) => {
    const dateA:any = parse(a.date, "M/d/yyyy, h:mm:ss a", new Date());
    const dateB:any = parse(b.date, "M/d/yyyy, h:mm:ss a", new Date());
    return dateB - dateA;
  });
  return sortedItems
}

  // Calculate pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);


//   useEffect(()=>{
//         if (!allUsersState) {
//       return
//     }
// setAllUsers(allUsersState)
//   },[allUsersState])
  

const handleClearFunds = (username:string)=>{
  if (confirm("are you sure you want to clear all the funds of "+ username.toLocaleUpperCase() )) {
    // console.log("delete");
    mutation.mutate(username)
    
  }
  else{
    console.log("dont delete");
    
  }
}
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [allUsersState]);

  useEffect(() => {
         if (!allUsersState) {
      return
    }
    let result = allUsers;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((user:any) => 
        user.username.toLowerCase().includes(query) ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
      );
    }
    
    // Filter by first letter
    if (selectedLetter) {
      result = result.filter((user:any) => 
        user.username.toLowerCase().startsWith(selectedLetter.toLowerCase())
      );
    }
    
    // Filter by role
    if (selectedRole !== 'all') {
      result = result.filter((user:any) => user.role === selectedRole);
    }
    
    setFilteredUsers(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [searchQuery, selectedLetter, selectedRole, allUsersState]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already handled in the useEffect
  };

  const handleSelectUser = (userId: number, isChecked: boolean) => {
    setSelectedUsers(prev => 
      isChecked ? [...prev, userId] : prev.filter(id => id !== userId)
    );
  };

  const handleDeleteSelected = async() => {

    if (selectedUsers.length === 0 || !window.confirm('Are you sure you want to delete the selected users?')) return;
    
    // setAllUsers(allUsers.filter((user:any) => !selectedUsers.includes(user.id)));
    // handle delete

    const res = await fetch("/api/admin/get-all-users/"+selectedUsers[0],
      {
        method:"DELETE"
      }
    )
    // console.log(await res.json());
    const response = await res.json()

    if (response.success) {
      window.location.reload()
    }
    

  
    setSelectedUsers([]);
  };

  const handleAddUser = () => {
    router.push("/admin/auth/users/add")
  };

  useEffect(()=>{
console.log(allUsersState);

  },[allUsersState])
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUsers(e.target.checked ? currentUsers.map((user:any) => user._id) : []);
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  useEffect(()=>{
console.log(selectedUsers);

  },[selectedUsers])


  return (
    <div className="max-w-full px-4 my-8">
      {/* Desktop Layout */}
      {!isMobile && (
        <div className="flex gap-5">
          {/* Main Content */}
          <div className="flex-1 overflow-x-auto">
            <div className="min-w-[800px]">
              <div className="flex justify-between items-center mb-5">
                <h2 className="m-0 text-xl font-bold">User Management</h2>
                <button
                  onClick={handleAddUser}
                  className="bg-primary text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-blue-600 transition-colors flex items-center gap-2"
                >
                  <FaPlus /> Add User
                </button>
              </div>

              {/* Search and Delete Bar */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-md">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                  </div>
                </form>
                      {selectedUsers.length > 0 && (
                        <button
                          onClick={handleDeleteSelected}
                          className="bg-red-500 text-white border-none py-2 px-4 rounded cursor-pointer hover:bg-red-600 transition-colors flex items-center gap-2"
                        >
                          <FaTimes /> Delete Selected ({selectedUsers.length})
                        </button>
                      )}
              </div>

              {/* Table Headers */}
              <div className="flex bg-gray-100 p-3 font-bold border-b border-gray-300">
                <div className="w-12">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex-[2] min-w-[150px]">Username</div>
                <div className="flex-[3] min-w-[200px]">Email</div>
                <div className="flex-[2] min-w-[120px]">First Name</div>
                <div className="flex-1 min-w-[100px]">Role</div>
                <div className="flex-[2] min-w-[120px]">Action</div>
              </div>

              {/* User Rows */}
              {currentUsers.length > 0 ? (
                currentUsers.map((user:any, index:any) => (
                  <div key={user._id} className={`flex items-center p-3 border-b border-gray-300 ${selectedUsers.includes(user._id) ? 'bg-gray-50' : ''} ${index % 2 === 0 ? 'bg-lightPrimary' : ''}`}>
                    <div className="w-12">
                      <input 
                        type="checkbox" 
                        checked={selectedUsers.includes(user._id)}
                        onChange={(e) => handleSelectUser(user._id, e.target.checked)}
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="flex-[2] min-w-[150px]">{user.username}</div>
                    <div className="flex-[3] min-w-[200px]">{user.email}</div>
                    <div className="flex-[2] min-w-[120px]">{user.name}</div>
                    <div className="flex-1 min-w-[100px]">
                      {user.role === 'admin' ? (
                        <FaUserShield className="text-green-500" />
                      ) : (
                        <FaUser className="text-red-500" />
                      )}
                    </div>
                      <div className="flex-[2] min-w-[120px]  ">
                        <button className='bg-red-500 rounded-lg px-2 py-1 text-white cursor-pointer'
                        onClick={()=> handleClearFunds(user.username)}
                        >Clear Funds</button>
                      </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No users found matching "{searchQuery}"
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 gap-1">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-blue-50'}`}
                  >
                    <FaChevronLeft />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 ${currentPage === number ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-blue-50'}`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Filters - Right Side for Desktop */}
          <div className="w-64">
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <FaFilter /> Filter by Username
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedLetter === letter ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {letter}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedLetter('')}
                  className={`px-3 h-8 rounded-full ${!selectedLetter ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  All
                </button>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <FaFilter /> Filter by Role
              </h3>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as 'all' | 'admin' | 'user')}
                className="w-full p-2 rounded border border-gray-300 mt-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Layout */}
      {isMobile && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="m-0 text-xl font-bold">User Management</h2>
            <button
              onClick={handleAddUser}
              className="bg-primary text-white border-none py-2 px-3 rounded cursor-pointer hover:bg-blue-600 transition-colors flex items-center gap-1 text-sm"
            >
              <FaPlus /> Add
            </button>
          </div>

          {/* Search and Delete Bar */}
          <div className="flex items-center gap-2 mb-4">
            <form onSubmit={handleSearch} className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>
            </form>
                  {selectedUsers.length > 0 && (
                    <button
                      onClick={handleDeleteSelected}
                      className="bg-red-500 text-white border-none py-2 px-3 rounded cursor-pointer hover:bg-red-600 transition-colors flex items-center gap-1 text-sm"
                    >
                      <FaTimes /> Delete ({selectedUsers.length})
                    </button>
                  )}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[800px]">
              {/* Table Headers */}
              <div className="flex bg-gray-100 p-3 font-bold border-b border-gray-300">
                <div className="w-12">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={selectedUsers.length === currentUsers.length && currentUsers.length > 0}
                    className="cursor-pointer"
                  />
                </div>
                <div className="flex-[2] min-w-[150px]">Username</div>
                <div className="flex-[3] min-w-[200px]">Email</div>
                <div className="flex-[2] min-w-[120px]">First Name</div>
                <div className="flex-[2] min-w-[120px]">Last Name</div>
                <div className="flex-1 min-w-[100px]">Role</div>
              </div>

              {/* User Rows */}
              {currentUsers.length > 0 ? (
                currentUsers.map((user:any, index:any) => (
                  <div key={user._id} className={`flex items-center p-3 border-b border-gray-300 ${selectedUsers.includes(user._id) ? 'bg-gray-50' : ''} ${index % 2 === 0 ? 'bg-lightPrimary' : ''}`}>
                    <div className="w-12">
                      <input 
                        type="checkbox" 
                        checked={selectedUsers.includes(user._id)}
                        onChange={(e) => handleSelectUser(user.id, e.target.checked)}
                        className="cursor-pointer"
                      />
                    </div>
                    <div className="flex-[2] min-w-[150px]">{user.username}</div>
                    <div className="flex-[3] min-w-[200px]">{user.email}</div>
                    <div className="flex-[2] min-w-[120px]">{user.name}</div>
                    <div className="flex-[2] min-w-[120px]">{user.lastName}</div>
                    <div className="flex-1 min-w-[100px]">
                      {user.role === 'admin' ? (
                        <FaUserShield className="text-green-500" />
                      ) : (
                        <FaUser className="text-red-500" />
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No users found matching "{searchQuery}"
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-4 gap-1">
                  <button
                    onClick={() => paginate(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-blue-50'}`}
                  >
                    <FaChevronLeft />
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 ${currentPage === number ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
                    >
                      {number}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className={`p-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-primary hover:bg-blue-50'}`}
                  >
                    <FaChevronRight />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Filters - Below Table */}
          <div className="mt-6">
            <div className="mb-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <FaFilter /> Filter by Username
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {alphabet.map(letter => (
                  <button
                    key={letter}
                    onClick={() => setSelectedLetter(selectedLetter === letter ? '' : letter)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${selectedLetter === letter ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                  >
                    {letter}
                  </button>
                ))}
                <button
                  onClick={() => setSelectedLetter('')}
                  className={`px-3 h-8 rounded-full ${!selectedLetter ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
                >
                  All
                </button>
              </div>
            </div>

            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <FaFilter /> Filter by Role
              </h3>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as 'all' | 'admin' | 'user')}
                className="w-full p-2 rounded border border-gray-300 mt-3 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;