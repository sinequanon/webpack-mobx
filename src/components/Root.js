import React from 'react'
import { Match } from 'react-router'
import { Provider } from 'mobx-react'
import { useStrict } from 'mobx'
import DevTools from 'mobx-react-devtools' // eslint-disable-line import/no-extraneous-dependencies

import App from './App'
import Home from './Home'
import Home2 from './Home2'
import routeMap from './Routes'
import configureStore from '../state/configureStore'
import FormsView from './FormsView'

const useConfig = false
const IS_PROD = process.env.NODE_ENV === 'production'

// useStrict prevents mobx observables from changing without an action being called
useStrict(true)

let appComponent
// Example using declarative Match vs a route config
if (useConfig) {
  appComponent =
      <App>
        { routeMap.map((route, i) =>
          (route.exact && <Match key={i} exactly pattern={route.pattern} component={route.component}/>) ||
          <Match key={i} pattern={route.pattern} component={route.component}/>
        )}
      </App>
} else {
  appComponent =
      <App>
        <Match exactly pattern='/' component={Home} />
        <Match pattern='/page2' component={Home2} />
        <Match pattern='/todos' component={FormsView} />
        { !IS_PROD && <DevTools /> }
      </App>
}

export default () =>
    <Provider store={configureStore()}>
      {appComponent}
    </Provider>
