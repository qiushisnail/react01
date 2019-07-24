import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger' // 先引入先执行
import thunk from 'redux-thunk'
import counter from './counter.redux'
import user from './user.redux'

export default createStore(
  combineReducers({ counter, user }),
  applyMiddleware(logger, thunk)
)