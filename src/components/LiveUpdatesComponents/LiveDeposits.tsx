import React, { useEffect, useState } from 'react'
import { liveUpdateUsersDeposit } from '../../../utils/liveUpdateData'
import Image from 'next/image'



const LiveDeposits = () => {
    // Fisher-Yates shuffle + pick first 'count' items
      function getRandomItems(liveUpdateUsersDeposit: any, count: number) {
        const copy = [...liveUpdateUsersDeposit];
        for (let i = copy.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [copy[i], copy[j]] = [copy[j], copy[i]];
        }
        return copy.slice(0, count);
      }
    
      const [randomItems, setRandomItems] = useState<any>(null);
     
    
           useEffect(() => {
            const intervalId = setInterval(() => {
              setRandomItems(getRandomItems(liveUpdateUsersDeposit, 10));
            }, 3000);
        
            // Cleanup on unmount
            return () => clearInterval(intervalId);
          }, [liveUpdateUsersDeposit]);
          
    
  return (
   <section className=' lg:w-[45%] text-[0.7rem] lg:mt-0 mt-16'>
       <div >
           <header className='bg-primary px-4 text-white py-2 rounded-md '>
               <h1>Live Deposit</h1>
               </header> 
   
               {/* live update display */}
               <div className='bg-[#f7f9fa]'>
                   {/* header */}
           <div className='flex justify-between items-center gap-x-8 font-semibold bg-primary text-white py-4 px-4  my-4'>
           <div  className='w-[20%]'>Amount</div>
           <div className='text-start w-[55%]'>Name</div>
           <div className='w-[20%] flex items-start'>
               
           <p>Country</p>
               </div>
           </div>
           {/* List */}
                   <div>
   
                   </div>
   {randomItems   && randomItems.map((item:any)=>{
   
       return <section key={item.id} className='flex justify-between items-center py-4 border-b-[1px] border-[#a9b5bb] gap-x-8 px-4 '>
           <div className='w-[20%]'>{item.value}</div>
           <div className='text-start w-[55%]'>{item.name}</div>
              <div className='w-[20%] flex items-start'>
              <div className='relative h-8 w-8 overflow-hidden'>
       <Image
           src={`https://flagcdn.com/w320/${item.country}.png`}
           alt={`${item.countryFullName} flag`}
       fill
       className='absolute w-full h-full rounded-full object-cover'
         />
       </div>
              </div>
   
       </section>
   })}
               </div>
          
       </div>
   
   </section>
  )
}

export default LiveDeposits