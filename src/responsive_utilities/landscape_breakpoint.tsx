import React from 'react'
import Breakpoint from './breakpoints'
export default function DesktopBreakpoint(props : any) {
  return (
    <Breakpoint name='landscape'>
      {props.children}
    </Breakpoint>
  )
}
