import * as React from 'react'
import {render}  from 'react-dom'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter} from 'react-router-dom'
import * as bowser from 'bowser'
import App from './containers/App'
import {applyMiddleware, compose, createStore} from 'redux'
import reducer from './reducers'
declare const window: {__REDUX_DEVTOOLS_EXTENSION__}
declare const process

const useDevTools:boolean =
  process.env.NODE_ENV !== 'production' && bowser.chrome

const store = createStore<any>(
  reducer, useDevTools ? compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ) : applyMiddleware(thunk)
);

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById('root'));