import React from 'react'
import { action, observable } from 'mobx'
import { observer } from 'mobx-react'

import AsyncSelectField from './AsyncSelectField'
import Posts from './Posts'

const observablePosts = observable({
  posts: [],
  isFetchingPosts: false,
})

const fieldOptions = {
  url: input => (`https://www.reddit.com/subreddits/search.json?q=${input}`),

  callback: (res, cb) => {
    cb(null, {
      options: (res.data.data && res.data.data.children.map(child => ({ value: child.data.id, label: child.data.display_name }))) || [],
    })
  },

  afterHandleChange: action((json) => {
    observablePosts.isFetchingPosts = false
    if (json) {
      const posts = json.data.data.children.map(child => child.data)
      observablePosts.posts.replace(posts)
    } else {
      observablePosts.posts.clear()
    }
  }),

  beforeHandleChange: action((val) => {
    if (val) {
      observablePosts.isFetchingPosts = true
    }
  }),
}

export default observer(() => (
  <div className='home'>
    <h1>MobXedit</h1>
    <AsyncSelectField
      name='selectSubreddit'
      className='selectSubreddit'
      multi={false}
      options={fieldOptions}
    />
    { observablePosts.isFetchingPosts && <h2>loading...</h2> }
    { ((observablePosts.isFetchingPosts || observablePosts.posts.length) && <Posts posts={observablePosts.posts}/>) || <h2>No posts</h2>}
  </div>))
