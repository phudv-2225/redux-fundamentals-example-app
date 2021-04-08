import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducer'
import { print1, print2, print3, loggerMiddleware, alwaysReturnHelloMiddleware } from './exampleAddons/middleware'

const middlewareEnhancer = applyMiddleware(print1, print2, print3, loggerMiddleware, alwaysReturnHelloMiddleware)
const store = createStore(rootReducer, middlewareEnhancer)

export default store
