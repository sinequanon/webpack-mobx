import React, { Component } from 'react'

import AsyncSelectField from './AsyncSelectField'
import Posts from './Posts'

class RedditWithSetState extends Component {

  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      isFetchPosts: false,
    }
  }

  get fieldOptions() {
    return {
      url: input => (`https://www.reddit.com/subreddits/search.json?q=${input}`),

      callback: (res, cb) => {
        cb(null, {
          options: (res.data.data && res.data.data.children.map(child => ({ value: child.data.id, label: child.data.display_name }))) || [],
        })
      },

      afterHandleChange: (json) => {
        if (json) {
          const newPosts = json.data.data.children.map(child => child.data)
          this.setState({
            posts: newPosts,
          })
        } else {
          this.setState({
            posts: null,
          })
        }
      },

      beforeHandleChange: (val) => {
        if (val) {
          this.setState({
            isFetchingPosts: true,
          })
        }
      },
    }
  }

  render() {
    const { isFetchingPosts, posts } = this.state
    return <div className='home2'>
      <h1>Reddit with setState</h1>
      <AsyncSelectField
        name='selectSubreddit'
        className='selectSubreddit'
        multi={false}
        options={this.fieldOptions}
      />
      { isFetchingPosts && <h2>loading...</h2> }
      { ((isFetchingPosts || posts.length) && <Posts posts={posts}/>) || <h2>No posts</h2>}
  </div>
  }
}

export default RedditWithSetState
