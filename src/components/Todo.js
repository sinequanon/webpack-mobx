import React from 'react'
import { observer } from 'mobx-react'

export default observer(({ todo }) =>
  <li>{todo}</li>
)
