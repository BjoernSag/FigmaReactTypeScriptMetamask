import React from 'react'
import Breakpoint from './breakpoints'
export default function DesktopBreakpoint({children} :{children : Object}) {
  return (
    <Breakpoint name='landscape'>
      {children}
    </Breakpoint>
  )
}
