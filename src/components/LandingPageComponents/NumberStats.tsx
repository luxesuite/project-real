import React from 'react'


const data = [
    {
        id:1,
        value: "3123",
        title:"Running Time"
    },
    {
        id:2,
        value: "4143",
        title:"Total Accounts"
    },
    {
        id:3,
        value: "$ 4669896.79",
        title:"Total Deposits"
    },
    {
        id:4,
        value: "$ 5729904",
        title:"Total Withdrawals"
    },

]
const NumberStats = () => {
  return ( 
    <div className='bg-image-class  h-[450px] lg:h-[300px]  mt-32'>
        <div className='flex justify-between items-center  flex-col lg:flex-row  h-full w-full bg-[#000000c9] px-[2px] lg:px-16 py-6 md:py-8 lg:py-4'>

{
    data.map((item,_)=>{
        
        return <div key={item.id} className='w-[90%] md:w-[95%] lg:w-[22%] border-primary border-[1px]  bg-[#000000b8] h-[23%] lg:h-[70%] rounded-lg flex items-center justify-center flex-col'>
            <h1 className='text-white text-[1.4rem] font-semibold'>{item.value}</h1>
            <p className='text-primary'>{item.title}</p>
        </div>
    })
}
    </div>
    </div>
  )
}

export default NumberStats