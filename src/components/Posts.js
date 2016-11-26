import React from 'react'
import { observer } from 'mobx-react'

import Post from './Post'

export default observer(({ posts }) =>
  <ul>
    {posts && posts.map(post => (<Post key={post.id} post={post} />))}
  </ul>
)

