import React from 'react'
import { inject, observer } from 'mobx-react'

import InputField from '../components/InputField'
import { Pitch, PitchActions } from '../state/Pitch'

const handleInputChange = (name, value) => {
  PitchActions.changeValue(name, value)
}

const FormsView = () =>
  <div>
    <InputField
      label='Title'
      onChange={handleInputChange}
      id='title'
      name='title'
      value={Pitch.title}
    />
    <InputField
      label='Writer'
      onChange={handleInputChange}
      id='writer'
      name='writer'
      value={Pitch.writer}
    />
    <InputField
      type='textarea'
      label='LogLine'
      onChange={handleInputChange}
      id='logline'
      name='logline'
      value={Pitch.logline}
    />
    <pre><code>
        {JSON.stringify(Pitch, null, 2)}
    </code></pre>
  </div>

export default inject('store')(observer(FormsView))
