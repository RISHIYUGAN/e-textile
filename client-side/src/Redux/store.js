import {createStore,combineReducers,applyMiddleware,compose} from "redux"
import thunk from "redux-thunk"
import {AuthReducer,DashbdPersonalReducer,HistryPersonalReducer} from "./Reducers"

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default()=>{
    const store=createStore(
        combineReducers({
            Auth:AuthReducer,
            Dasbd:DashbdPersonalReducer,
            History:HistryPersonalReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
  return store 
}