'use client';

import Loader from '@/components/Loader';
import { appDispatch, RootState } from '@/store';
import { updateNotification } from '@/store/admin-slices/allNotifications';
import { openModal } from '@/store/slices/modalSlice';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaEnvelope, FaEnvelopeOpen, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { postHistory } from '../../../../utils/AdminUtils/AddHistory';
import { dateSort } from '../../../../utils/dateSort';

type ActionType = 'bonus' | 'withdrawal' | 'investment' | 'signup' | 'deposit';


const postData = async(formDetails:any)=>{
    const res = await fetch(`/api/admin/notification/delete-notification`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(formDetails)


})

return res.json()
}

const NotificationTable = () => {

const [historyItems,setHistoryItems] = useState<any[]>([])
const dispatch = useDispatch<appDispatch>()
//   const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 50;
  
  const allNotificationsState = useSelector((state:RootState)=>{
return state.allNotificationsReducer
  })
  // Pagination calculations
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications:any =  allNotificationsState.slice(indexOfFirstNotification, indexOfLastNotification);
  const totalPages = Math.ceil(allNotificationsState.length / notificationsPerPage);
  const router = useRouter()

const mutation = useMutation({
    mutationFn:postData,
    onSuccess:(data)=>{
        console.log(data);
        if (data.success) {
           historyItems.forEach((item:any) => {
                      
                      postHistory({username:item.username,actionPerformed:"delete",action:"notification"})
                    });
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




  const handleSelectNotification = (id: string, isChecked: boolean) => {
    setSelectedNotifications(prev => 
      isChecked ? [...prev, id] : prev.filter(notificationId => notificationId !== id)
    );
  };
  useEffect(()=>{
console.log(selectedNotifications);

  },[selectedNotifications])

  const handleDeleteSelected = async() => {
    if (selectedNotifications.length === 0 || !window.confirm('Are you sure you want to delete the selected notifications?')) return;
   
    mutation.mutate(selectedNotifications)


  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNotifications(e.target.checked ? currentNotifications.map((notification:any) => (notification._id)) : []);
     setHistoryItems(e.target.checked ? currentNotifications: [])
  };

//   const markAsRead = (id: number) => {
//     // setNotifications(notifications.map(notification => 
//     //   notification.id === id ? {...notification, isRead: true} : notification
//     // ));
//   };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);


  const getActionTypeLabel = (type: any) => {
    switch(type) {
      case 'signup': return 'signup';
      case 'withdrawal': return 'withdrawal';
      case 'deposit': return 'deposit';
      case 'bonus': return 'bonus';
      case 'investment': return 'investment';
      default: return type;
    }
  };

  const getActionColor = (type:any) => {
    switch(type) {
      case 'signup': return 'bg-blue-100 text-blue-800';
      case 'withdrawal': return 'bg-green-100 text-green-800';
      case 'deposit': return 'bg-purple-100 text-purple-800';
      case 'bonus': return 'bg-red-100 text-red-800';
      case 'investment': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
   <>
 
       
            <div className='flex justify-end my-4'>
            <button className='bg-primary text-white rounded-lg p-2 cursor-pointer'
            onClick={()=>{
                router.push("/admin/accounts/notifications/add")
            }}
            >Add Notification</button>
        </div>
      {/* Header and Actions */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Notifications</h2>
        {selectedNotifications.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm flex items-center gap-1 hover:bg-red-600 transition-colors"
          >
            {mutation.isPending ? "deleting.." :  <><FaTrash size={14} /> Delete Selected</> }
          </button>
        )}
      </div>
      {/* NOTIFICATIONS LESS THAN ONE */}
         {allNotificationsState && allNotificationsState.length < 1 && (
           <div className='flex items-center justify-center my-16 flex-col gap-2'>
            No notification available
          </div>
         )}

         {/* NOTIFICATIONS MORE THAN ZERO*/}
{allNotificationsState.length > 0 &&  (
   <div className="overflow-x-auto">
        {/* Fixed width table - same for mobile and desktop */}
        <div className="min-w-[800px] w-full">
          {/* Table Headers - Center aligned for icons */}
          <div className="flex bg-gray-100 p-2 border-b border-gray-300 text-sm font-medium">
            <div className="w-10 flex items-center justify-center">
              <input 
                type="checkbox" 
                onChange={handleSelectAll}
                checked={selectedNotifications.length === currentNotifications.length && currentNotifications.length > 0}
                className="cursor-pointer"
              />
            </div>
            <div className="w-[180px] px-2 flex items-center">User</div>
            <div className="w-[150px] px-2 flex items-center">Notification Type</div>
            <div className="w-[120px] px-2 flex items-center justify-center">Read</div>
            <div className="w-[200px] px-2 flex items-center">Created</div>
            <div className="flex-1 min-w-[300px] px-2 flex items-center">Message</div>
          </div>

          {/* Notification Rows */}
          {dateSort(allNotificationsState).map((notification:any) => (
            <div 
              key={notification._id} 
              className={`flex items-center p-2 border-b border-gray-200 text-sm ${
                selectedNotifications.includes(notification._id) ? 'bg-gray-50' : ''
              } ${!notification.isRead ? 'font-medium' : ''}`}
            //   onClick={() => !notification.isRead && markAsRead(notification.id)}
            >
              <div className="w-10 flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={selectedNotifications.includes(notification._id)}
                  // onChange={(e) => handleSelectNotification(notification._id, e.target.checked)}
                     onChange={(e) =>{
 handleSelectNotification(notification._id, e.target.checked)

 const find = historyItems.some(his => his._id == notification._id)
 if (find) {
   
   const remove = historyItems.filter(his => his._id !== notification._id)
   setHistoryItems([...remove])
return
  }
setHistoryItems([...historyItems,notification])

                  }}
                  className="cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
              <div className="w-[180px] px-2 truncate">{notification.username}</div>
              <div className="w-[150px] px-2">
                <span className={`text-xs px-2 py-1 rounded ${getActionColor(notification.notificationType)}`}>
                  {getActionTypeLabel(notification.notificationType)}
                </span>
              </div>
              <div className="w-[120px] px-2 flex items-center justify-center">
                {notification.read === "yes" ? (
                  <FaEnvelopeOpen className="text-green-500" />
                ) : (
                  <FaEnvelope className="text-gray-400" />
                )}
              </div>
              <div className="w-[200px] px-2 text-gray-600">{notification.date}</div>
              <div className="flex-1 min-w-[300px] px-2 truncate">{notification.details}</div>
            </div>
          ))}

          {/* Empty State */}
          {allNotificationsState.length === 0 && (
            <div className="flex p-4 text-center text-gray-500">
              <div className="w-10"></div>
              <div className="flex-1">No notifications found</div>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 gap-1">
              <button
                onClick={() => paginate(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
              >
                <FaChevronLeft />
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`w-8 h-8 text-sm ${currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className={`p-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
              >
                <FaChevronRight />
              </button>
            </div>
          )}
        </div>
      </div>
)}
      {/* Table Container with Consistent Width */}
     
            </>
  );
};

export default NotificationTable;