import * as React from 'react'
import {render}  from 'react-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import App from './containers/App'
import {applyMiddleware, compose, createStore} from 'redux'
import reducer from './reducers'
declare const window:{__REDUX_DEVTOOLS_EXTENSION__}

const store = createStore<any>(
  reducer, compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));