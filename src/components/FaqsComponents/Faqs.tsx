"use client"
import React, { useState } from 'react'
import { questionAnswers } from '../../../utils/questionsAnswers'
import { FaAngleUp } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

const Faqs = () => {
const [currQuestions,setCurrQuestions] = useState<string[]>([])
  return (
    <div>
<h1 className='text-center font-semibold text-[1.4rem] my-4'>FAQS</h1>
{/* Accordion */}

<div className='text-primary '>
    {questionAnswers.map((item,index)=>{

        return <div className='bg-lightPrimary my-4 md:w-[80%] lg:w-[60%] w-[90%] mx-auto py-4 px-2 rounded-lg'>
            <article className='flex lg:text-[1.2rem] text-[1.05rem] justify-between  items-start'>
                <p className='font-medium'>{item.quest}</p>
                <button 
                onClick={()=>{
if (currQuestions.some(curr => curr == item.answer)) {
    setCurrQuestions([])
}
else{
    setCurrQuestions([item.answer])
}

                }}
                ><FaAngleUp className='text-medium'/></button>
            </article >
           {currQuestions.some(curr => curr == item.answer)  && (

            <div className='font-light my-2'>
                {item.answer}
            </div>
           )}
        </div>
    })}
</div>
    </div>
  )
}

export default Faqs