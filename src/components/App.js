import React from 'react'

import NavLink from './NavLink'

export default props =>
  <div className='app'>
    <div className='navigation'>
      <NavLink to='/'>Reddit with MobX</NavLink>
      <NavLink to='/setState'>Reddit with setState</NavLink>
      <NavLink to='/todos'>Mobx Todos</NavLink>
    </div>
    { props.children }
  </div>
