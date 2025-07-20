'use client';

import { appDispatch } from '@/store';
import { openModal } from '@/store/slices/modalSlice';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';

// type Purchase = {
//   id: number;
//   username: string;
//   amount: number;
//   createdAt: string;
//   purchaseItem: string;
//   yetToBalance: number;
// };

// delete investments

const postData = async(formDetails:any)=>{
    const res = await fetch(`/api/admin/investment/delete-investment`,{
    method:"POST",
    headers:{
        "Content-Type":"application/json"
    },
    body:JSON.stringify(formDetails)


})

return res.json()
}
const InvestmentLists = ({allInvestments}:{allInvestments:any}) => {

const [historyItems,setHistoryItems] = useState<any[]>([])

  // Sample purchase data
  // const initialPurchases: Purchase[] = [
  //   {
  //     id: 1,
  //     username: 'john_doe',
  //     amount: 45.99,
  //     createdAt: '2023-05-15',
  //     purchaseItem: 'Wireless Headphones',
  //     yetToBalance: 0
  //   },
  //   {
  //     id: 2,
  //     username: 'jane_smith',
  //     amount: 120.50,
  //     createdAt: '2023-05-14',
  //     purchaseItem: 'Smart Watch',
  //     yetToBalance: 50.50
  //   },
  //   ...Array.from({ length: 18 }, (_, i) => ({
  //     id: i + 3,
  //     username: `user_${i + 3}`,
  //     amount: [45.99, 120.50, 29.99, 199.99, 15.49][i % 5],
  //     createdAt: `2023-05-${13 - Math.floor(i/2)}`,
  //     purchaseItem: ['T-Shirt', 'Coffee Mug', 'Notebook', 'Backpack', 'Water Bottle'][i % 5],
  //     yetToBalance: [0, 10.50, 5.99, 0, 15.49][i % 5]
  //   }))
  // ];
    const dispatch = useDispatch<appDispatch>()
const mutation = useMutation({
    mutationFn:postData,
    onSuccess:(data)=>{
        console.log(data);
        if (data.success) {
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


const [purchases, setPurchases] = useState<any[]>(allInvestments);
const [selectedPurchases, setSelectedPurchases] = useState<number[]>([]);
const [currentPage, setCurrentPage] = useState(1);
const purchasesPerPage = 50;

const router = useRouter()
  // Pagination calculations
  const indexOfLastPurchase = currentPage * purchasesPerPage;
  const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
  const currentPurchases = purchases.slice(indexOfFirstPurchase, indexOfLastPurchase);
  const totalPages = Math.ceil(purchases.length / purchasesPerPage);

  const handleSelectPurchase = (id: number, isChecked: boolean) => {
    setSelectedPurchases(prev => 
      isChecked ? [...prev, id] : prev.filter(purchaseId => purchaseId !== id)
    );
  };

  const handleDeleteSelected = () => {
    if (selectedPurchases.length === 0 || !window.confirm('Are you sure you want to delete the selected purchases?')) return;
console.log("yea");

    mutation.mutate(selectedPurchases)
  };

  useEffect(()=>{
console.log(selectedPurchases);

  },[selectedPurchases])
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPurchases(e.target.checked ? currentPurchases.map(purchase => purchase._id) : []);
         setHistoryItems(e.target.checked ? currentPurchases : [])
  };

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

return (
    <div className="max-w-full p-6">
      {/* Header and Actions */}
  <div className='flex justify-end my-4'>
    <button className='bg-primary text-white rounded-lg p-2 cursor-pointer'
    onClick={()=>{
        router.push("/admin/accounts/investments/add")
    }}
    >Add Investment</button>
</div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Investment Records</h2>
 
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
        <div className="min-w-[1100px] w-full">
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
            <div className="w-[250px] px-4 flex items-center">Username</div>
            <div className="w-[150px] px-4 flex items-center">Amount</div>
            <div className="w-[200px] px-4 flex items-center">Created At</div>
            <div className="w-[250px] px-4 flex items-center">Plan</div>
            <div className="w-[150px] px-4 flex items-center">Profit Return</div>
          </div>

          {/* Purchase Rows with alternating colors */}
          {currentPurchases.map((purchase, index) => (
            <div 
              key={purchase._id} 
              className={`flex items-center p-4 border-b border-gray-200 text-sm ${
                selectedPurchases.includes(purchase._id) 
                  ? 'bg-blue-50' // Selected row color
                  : index % 2 === 0 
                    ? 'bg-white' // Even row
                    : 'bg-gray-50' // Odd row
              }`}
            >
              <div className="w-16 flex items-center justify-center">
                <input 
                  type="checkbox" 
                  checked={selectedPurchases.includes(purchase._id)}
                   onChange={(e) =>{
 handleSelectPurchase(purchase._id, e.target.checked)

 const find = historyItems.some(his => his._id == purchase._id)
 if (find) {
   
   const remove = historyItems.filter(his => his._id !== purchase._id)
   setHistoryItems([...remove])
return
  }
setHistoryItems([...historyItems,purchase])

                  }}
                  className="cursor-pointer h-4 w-4"
                />
              </div>
              <div className="w-[250px] px-4 truncate font-medium">
                {purchase.username}
              </div>
              <div className="w-[150px] px-4">
                {formatCurrency(purchase.amount)}
              </div>
              <div className="w-[200px] px-4 text-gray-600">
                {purchase.date}
              </div>
              <div className="w-[250px] px-4 truncate">
                {purchase.plan}
              </div>
              <div className="w-[150px] px-4">
                {formatCurrency(purchase.profitReturn)}
              </div>
            </div>
          ))}

          {/* Empty State */}
          {currentPurchases.length === 0 && (
            <div className="flex p-6 text-center text-gray-500">
              <div className="w-16"></div>
              <div className="flex-1">No purchase records found</div>
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

export default InvestmentLists


// 'use client';

// import React, { useState } from 'react';
// import { FaChevronLeft, FaChevronRight, FaTrash } from 'react-icons/fa';

// type Purchase = {
//   id: number;
//   username: string;
//   amount: number;
//   createdAt: string;
//   purchaseItem: string;
//   yetToBalance: number;
// };

// const PurchaseManagement = () => {
//   // Sample purchase data with datetime
//   const initialPurchases: Purchase[] = [
//     {
//       id: 1,
//       username: 'john_doe_with_long_username',
//       amount: 45.99,
//       createdAt: '2023-05-15 10:30 AM',
//       purchaseItem: 'Wireless Headphones',
//       yetToBalance: 0
//     },
//     {
//       id: 2,
//       username: 'jane_smith_with_long_name',
//       amount: 120.50,
//       createdAt: '2023-05-14 02:45 PM',
//       purchaseItem: 'Smart Watch',
//       yetToBalance: 50.50
//     },
//     ...Array.from({ length: 8 }, (_, i) => ({
//       id: i + 3,
//       username: `user_${i+3}_with_long_username_example`,
//       amount: [45.99, 120.50, 29.99, 199.99, 15.49][i % 5],
//       createdAt: `2023-05-${13 - Math.floor(i/2)} ${['10:30 AM', '02:15 PM', '09:45 AM', '04:20 PM', '11:10 AM'][i % 5]}`,
//       purchaseItem: ['T-Shirt', 'Coffee Mug', 'Notebook', 'Backpack', 'Water Bottle'][i % 5],
//       yetToBalance: [0, 10.50, 5.99, 0, 15.49][i % 5]
//     }))
//   ];

//   const [purchases, setPurchases] = useState<Purchase[]>(initialPurchases);
//   const [selectedPurchases, setSelectedPurchases] = useState<number[]>([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const purchasesPerPage = 10;

//   // ... (keep all the existing handler functions unchanged)

  
// };

// export default PurchaseManagement;