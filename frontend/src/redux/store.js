import userReducer  from "./UserSlice"
const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({user:userReducer})

export const store = configureStore({
    reducer:rootReducer
})