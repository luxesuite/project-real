'use client';

import Loader from '@/components/Loader';
import { appDispatch, RootState } from '@/store';
import { updateBonus } from '@/store/admin-slices/allBonusesSlice';
import { openModal } from '@/store/slices/modalSlice';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { postHistory } from '../../../utils/AdminUtils/AddHistory';
import { dateSort } from '../../../utils/dateSort';


const postData = async(formDetails:any)=>{
    const res = await fetch(`/api/admin/bonus/delete-bonus`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(formDetails)


})

return res.json()
}
const BonusComponent = ({allBonuses}:{allBonuses:any}) => {

const [historyItems,setHistoryItems] = useState<any[]>([])
    const dispatch = useDispatch<appDispatch>()
const mutation = useMutation({
    mutationFn:postData,
    onSuccess:(data)=>{
        console.log(data);
        if (data.success) {
          historyItems.forEach((item:any) => {
            
            postHistory({username:item.username,actionPerformed:"delete",action:"bonus"})
          });
          
          window.location.reload()
        }

        // data.data.forEach((item:any) => {
          
        //    postHistory({username:item.username,actionPerformed:"delete",action:"bonus"})
        // });
        if (data.message) {
            dispatch(openModal(data.message))
        }
        
    },
    onError:(error)=>{
        console.log(error);
        dispatch(openModal(error.message))
        
    }
})
  const router = useRouter()

// purchase is used for the bonus state coming from the parent compoent
  const [purchases, setPurchases] = useState<any[]>(dateSort(allBonuses));
  const [selectedPurchases, setSelectedPurchases] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const purchasesPerPage = 50;

  // Calculate pagination
  const indexOfLastPurchase = currentPage * purchasesPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
  const currentPurchases = purchases.slice(indexOfFirstPurchase, indexOfLastPurchase);
  const totalPages = Math.ceil(purchases.length / purchasesPerPage);

  const handleSelectPurchase = (id: number, isChecked: boolean) => {
    setSelectedPurchases(prev => 
      isChecked ? [...prev, id] : prev.filter(purchaseId => purchaseId !== id)
    );
  };


    const handleDeleteSelected = async() => {
    if (selectedPurchases.length === 0 || !window.confirm('Are you sure you want to delete the selected notifications?')) return;
   
    mutation.mutate(selectedPurchases)


  };


  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPurchases(e.target.checked ? currentPurchases.map(purchase => purchase._id) : []);
    setHistoryItems(e.target.checked ? currentPurchases : [])
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(amount);
//   };







  return (
    <div className="max-w-full p-6">
      {/* Header and Actions */}
             <div className='flex justify-end my-4'>
            <button className='bg-primary text-white rounded-lg p-2 cursor-pointer'
            onClick={()=>{
                router.push("/admin/accounts/bonus/add")
            }}
            >Add Bonus</button>
        </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Bonus Records</h2>
        {selectedPurchases.length > 0 && (
          <button
            onClick={handleDeleteSelected}
            className="bg-red-500 text-white px-4 py-2 rounded text-sm flex items-center gap-2 hover:bg-red-600 transition-colors"
          >
            {mutation.isPending ? "deleting.." :  <><FaTrash size={14} /> Delete Selected</> }
          </button>
        )}
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <div className="min-w-[700px] w-full">
          {/* Table Headers */}
          <div className="flex bg-gray-100 p-4 border-b border-gray-300 text-sm font-medium">
            <div className="w-16 flex items-center justify-center">
              <input 
                type="checkbox" 
                onChange={handleSelectAll}
                checked={selectedPurchases.length === currentPurchases.length && currentPurchases.length > 0}
                className="cursor-pointer h-4 w-4"
              />
            </div>
            <div className="w-[300px] px-4 flex items-center">Username</div>
            <div className="w-[200px] px-4 flex items-center">Amount</div>
            <div className="w-[300px] px-4 flex items-center">Created At</div>
          </div>

          {/* Purchase Rows with alternating colors */}
          {purchases.map((item:any, index:number) => (
            <div 
              key={item._id} 
              className={`flex items-center p-4 border-b border-gray-200 text-sm ${
                selectedPurchases.includes(item._id) 
                  ? 'bg-blue-50' // Selected row color
                  : index % 2 === 0 
                    ? 'bg-white' // Even row
                    : 'bg-gray-50' // Odd row
              }`}
            >
              <div className="w-16 flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={selectedPurchases.includes(item._id)}
                  onChange={(e) =>{
 handleSelectPurchase(item._id, e.target.checked)

 const find = historyItems.some(his => his._id == item._id)
 if (find) {
   
   const remove = historyItems.filter(his => his._id !== item._id)
   setHistoryItems([...remove])
return
  }
setHistoryItems([...historyItems,item])

                  }}
                  className="cursor-pointer h-4 w-4"
                />
              </div>
              <div className="w-[300px] px-4 truncate">
                {item.username}
              </div>
              <div className="w-[200px] px-4">
                ${item.amount}
              </div>
              <div className="w-[300px] px-4 text-gray-600">
                {item.date}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {currentPurchases.length === 0 && (
            <div className="flex p-6 text-center text-gray-500">
              <div className="w-16"></div>
              <div className="flex-1">No Bonus found</div>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-6 gap-2">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
          >
            <FaChevronLeft size={16} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`w-10 h-10 text-sm ${currentPage === number ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className={`p-2 ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50'}`}
          >
            <FaChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BonusComponent