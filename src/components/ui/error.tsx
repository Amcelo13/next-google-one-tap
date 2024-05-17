
import React from 'react'
import { Toaster, toast } from 'sonner'
interface ErrorComponentProps {
  type: string
  message: string
}
const ErrorComponent = (props: ErrorComponentProps) => {
  'use client'

  const { type, message } = props
  console.log("🚀 ~ ErrorComponent ~ message:", message)
  type === 'error' ? toast.error(message) : toast.success(message)
  
  
  return null
}

export default ErrorComponent