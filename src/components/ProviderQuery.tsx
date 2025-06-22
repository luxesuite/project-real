"use client"
import React, { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const ProviderQuery = ({children}:{children:ReactNode}) => {
    const [client] = useState(()=> new QueryClient())
  return (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  )
}

export default ProviderQuery