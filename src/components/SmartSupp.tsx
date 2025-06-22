"use client"
import { RootState } from '@/store'
import Script from 'next/script'
import React from 'react'
import { useSelector } from 'react-redux'

const smartKey = process.env.NEXT_PUBLIC_SMARTSUPPKEY as string
const SmartSupp = () => {
    const userInfo = useSelector((store:RootState)=>{
        return store.userReducer
    })


  return (
<>

     <Script id="smartsupp-chat" strategy="afterInteractive">
          {`
            var _smartsupp = _smartsupp || {};
            _smartsupp.key = '${smartKey}';
           ${userInfo.username ? ` _smartsupp.name = '${userInfo.username}' `: ""};
           ${userInfo.email ? ` _smartsupp.name = '${userInfo.email}' `: ""};
            window.smartsupp||(function(d) {
              var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
              s=d.getElementsByTagName('script')[0];c=d.createElement('script');
              c.type='text/javascript';c.charset='utf-8';c.async=true;
              c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
            })(document);
          `}
        </Script>
        <noscript>
          Powered by <a href="https://www.smartsupp.com" target="_blank" rel="noopener noreferrer">Smartsupp</a>
        </noscript>
</>
  )
}

export default SmartSupp