import React from 'react'
import { Match } from 'react-router'
import { Provider } from 'mobx-react'
import { useStrict } from 'mobx'
import DevTools from 'mobx-react-devtools' // eslint-disable-line import/no-extraneous-dependencies

import App from './App'
import redditWithMobx from './redditWithMobx'
import redditWithSetState from './redditWithSetState'
import configureStore from '../state/configureStore'
import FormsView from './FormsView'

const IS_PROD = process.env.NODE_ENV === 'production'

// useStrict prevents mobx observables from changing without an action being called
useStrict(true)

export default () =>
    <Provider store={configureStore()}>
      <App>
        <Match exactly pattern='/' component={redditWithMobx} />
        <Match pattern='/setState' component={redditWithSetState} />
        <Match pattern='/todos' component={FormsView} />
        { !IS_PROD && <DevTools /> }
      </App>
    </Provider>
