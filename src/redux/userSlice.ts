import { createSlice,type PayloadAction ,createAsyncThunk} from "@reduxjs/toolkit";
import { API } from "../global";
import type { UserProps } from "../types/data";

interface UserState{
    data:UserProps[]|null,
    loading:boolean,
    error:string|null
}


const initialState:UserState={
    data:null,
    loading:false,
    error:null
}

export const fetchUser=createAsyncThunk<UserProps[],void,{rejectValue:string}>("user/fetchUser",async(_,{rejectWithValue})=>{
    try{
        const response=await fetch(API)
        if(!response.ok)
        {
            return rejectWithValue("failed to fech user in thubnk ")
        }
        const result:UserProps[]=await response.json()
        return result
    }
    catch(error:unknown)
    {
         if(error instanceof Error)
         {
               return rejectWithValue(error.message || "unknwon error occured in thunk")
         }
         else    return rejectWithValue("something went wrong in redux thunk")
    }
})



const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(fetchUser.fulfilled,(state,action:PayloadAction<UserProps[]>)=>{
            state.data=action.payload
            state.loading=false
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload || action.error.message || "failed to fetch user in thunk"
        })
    }
})





export default userSlice.reducer


// import { createSlice, type PayloadAction ,createAsyncThunk} from "@reduxjs/toolkit";
// import { API } from "../global";
// import type { UserProps } from "../types/data";



// interface UserState{
//     data:UserProps|null,
//     loading:boolean,
//     error:string|null
// }


// const initialState:UserState={
//     data:null,
//     loading:false,
//     error:null
// }

// export const fetchUser=createAsyncThunk<UserProps,void,{rejectValue:string}>("user/fetchUser",async(_,{rejectWithValue})=>{
//     try{
//         const response=await fetch(API)
//         if(!response.ok)
//         {
//             return rejectWithValue("failed to fech user in thubnk ")
//         }
//         const result:UserProps=await response.json()
//         return result
//     }
//     catch(error)
//     {
//         if(error instanceof Error)
//         {
//             return rejectWithValue(error.message || "unknwon error occured in thunk")
//         }
//         else{
//             return rejectWithValue("an unknown error occured")
//         }
//     }
// })



// const userSlice=createSlice({
//     name:"user",
//     initialState,
//     reducers:{},
//     extraReducers:(builder)=>{
//         builder
//         .addCase(fetchUser.pending,(state)=>{
//             state.loading=true
//             state.error=null
//         })
//         .addCase(fetchUser.fulfilled,(state,action:PayloadAction<UserProps>)=>{
//             state.data=action.payload
//             state.loading=false
//         })
//         .addCase(fetchUser.rejected,(state,action)=>{
//             state.loading=false
//             state.error=action.payload || action.error.message || "failed to fetch user in thunk"
//         })
//     }
// })





// export default userSlice.reducer
