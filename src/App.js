// react related
import    React                         from 'react'
import    ReactDOM                      from 'react-dom'

import  { Router,
          Route,
          IndexRoute,
          browserHistory,
          applyRouterMiddleware }       from 'react-router'
import {  useScroll }                   from 'react-router-scroll';

// redux related
import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose }                             from 'redux';
import  { Provider }                    from 'react-redux'
import {
  syncHistoryWithStore,
  routerReducer }                       from 'react-router-redux'
import  thunk                           from 'redux-thunk';

// main reducers
import  chatBoxReducer                  from './pages/ChatBox/_Redux';

// Wrappers
import MainWrapper                      from './pages/MainWrapper';
import ChatBoxPageWrapper               from './pages/ChatBox/_Content';

const appReducer = combineReducers({
    chatBox : chatBoxReducer
  })

const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

const appStore = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);
const appHistory = syncHistoryWithStore(browserHistory, appStore);

require('es6-object-assign').polyfill();

ReactDOM.render((
  <Provider store={appStore}>
    <Router history={appHistory} render={applyRouterMiddleware(useScroll())}>

      <Route path="/" component={MainWrapper}>
        <IndexRoute component={ChatBoxPageWrapper}/>
      </Route>

    </Router>
  </Provider>

), document.getElementById('root'));
