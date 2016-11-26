import React from 'react'

import NavLink from './NavLink'

export default props =>
  <div className='app'>
    <div className='navigation'>
      <NavLink to='/'>Home</NavLink>
      <NavLink to='/page2'>Page 2</NavLink>
      <NavLink to='/todos'>Todos</NavLink>
    </div>
    { props.children }
  </div>
