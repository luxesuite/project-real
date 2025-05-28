import React from 'react'
import Image from 'next/image'
const Certificate = () => {
  return (
    <div className='w-[90%] lg:w-[20%]'>
<h1 className='font-semibold text-footerTextOne'>CERTIFICATE</h1>
<div className='relative w-[160px] h-[230px] my-4'>
    <Image
    className='absolute w-full h-full'
    src={"/cert.png"} alt='certificate' fill />
</div>

    </div>
  )
}

export default Certificate