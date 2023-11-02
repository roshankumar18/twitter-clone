const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    currentUser :null,
    isLoading:false,
    error:false
}
export const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        loginStart:(state)=>{
            state.isLoading = true
        },
        loginSuccess:(state,action)=>{
            state.isLoading = false
            state.currentUser = action.payload
        },
        loginFailed:(state)=>{
            state.isLoading =false
            state.error = true
        }
    }
})

export const {loginStart,loginFailed,loginSuccess} = userSlice.actions
export default userSlice.reducer