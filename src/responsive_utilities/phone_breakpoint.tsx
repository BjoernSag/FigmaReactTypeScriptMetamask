import React from 'react'
import Breakpoint from './breakpoints'
export default function PhoneBreakpoint({children} :{children : Object}) {
  return (
    <Breakpoint name='phone'>
      {children}
    </Breakpoint>
  )
}
