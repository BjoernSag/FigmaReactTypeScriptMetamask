import React from 'react'
import MediaQuery from 'react-responsive'

const breakpoints:{[key:string]:string} = {
  desktop: '(min-width: 1025px)',
  phone: '(max-width: 1024px) and (orientation : portrait)',
  landscape: '(max-width:1024px) and (orientation: landscape)',
}

export default function Breakpoint({children, name} : {children : Object, name : string}) {
  const breakpoint = breakpoints[name] || breakpoints.desktop
  return (
    <MediaQuery {...children } query={breakpoint}>
      {children}
    </MediaQuery>
  )
}
