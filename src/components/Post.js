import React from 'react'
import { observer } from 'mobx-react'
import _ from 'lodash'

import { sanitizeValue, createReactDescriptorFromHTML } from '../utils/sanitizeValue'

export default observer(({ post }) => {
  // Target the resolutions array, which contains a number of different image
  // urls
  const resolutions = _.get(post, 'preview.images[0].resolutions', [])
  // Use the last element in the array, which is normally the largest resolution
  const previewUrlRaw = resolutions.length && resolutions[resolutions.length - 1].url
  // The urls contains encoded ampersands, so decode them using the sanitizeValue
  // method
  const previewUrl = sanitizeValue(previewUrlRaw)
  // Expose the post self text as a react descriptor
  const seltText = createReactDescriptorFromHTML(post.selftext_html)
  return <li>
    <img src={previewUrl}/>
    <h2>{post.title}</h2>
    {seltText && <div>{seltText}</div>}
  </li>
})

