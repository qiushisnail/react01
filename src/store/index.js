import { createStore, applyMiddleware, combineReducers } from 'redux'
import logger from 'redux-logger' // 先引入先执行
import thunk from 'redux-thunk'
import counter from './counter.redux'
import user from './user.redux'
import createSagaMiddleware from 'redux-saga'
import saga from './sagas'

// 创建中间件
const mid = createSagaMiddleware()

// 应用中间件
const store = createStore(
  combineReducers({ counter, user }),
  applyMiddleware(logger, mid)
)
mid.run(saga)

export default store

// export default createStore(
//   combineReducers({ counter, user }),
//   applyMiddleware(logger, thunk)
// )