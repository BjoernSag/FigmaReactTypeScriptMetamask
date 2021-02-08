import React from 'react'
import Breakpoint from './breakpoints'
export default function DesktopBreakpoint({children} :{children : object}) {
  return (
    <Breakpoint name='desktop'>
      {children}
    </Breakpoint>
  )
}
