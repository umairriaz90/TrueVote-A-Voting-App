'use client'
 
import React from 'react'
import dynamic from 'nextdynamic'
 
const App = dynamic(() = import('....App'), { ssr false })
 
export function ClientOnly() {
  return App 
}