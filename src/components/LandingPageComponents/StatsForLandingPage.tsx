import React from 'react'
const paraclass = "text-[0.8rem]"
const headerClass = 'text-semibold text-[2.4rem]'
const divClass = 'w-[40%] mdlg:w-[20%] text-center'
export const StatsForLandingPage = () => {

  return (
    <div className='bg-lightPrimary text-primary my-4'>
        <div className='flex flex-wrap items-between justify-center gap-4 py-16'>
            {/* Users */}
            <div className={divClass}>
                <h1 className={headerClass}>2.7K</h1>
                <p className={`${paraclass}`}>Users</p>
            </div>
            <div className={divClass}>
                <h1 className={headerClass} >$10M+</h1>
                <p className={`${paraclass}`} >Investment Deposits</p>
            </div>
            <div className={divClass}>
                <h1 className={headerClass}>$55M+</h1>
                <p className={`${paraclass}`}>Withdrawals</p>
            </div  >
            <div className={divClass}>
                <h1 className={headerClass}>24/7</h1>
                <p className={`${paraclass}`}>Customer Support Running</p>
            </div>
        </div>
    </div>
  )
}
