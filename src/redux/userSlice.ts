import { createSlice,PayloadAction ,createAsyncThunk} from "@reduxjs/toolkit";
import { API } from "../global";
import { useQuery } from "@tanstack/react-query";


interface Task{
    UID:string,
    uuid:string,
    name:string,
    assignedDate: string,
    dueDate: string
}

type User={
     UID: string,
    name: string,
    email: string,
    password:string,
    role: string,
    department: string,
    getTask: Task[],
    completedTask: Task[],
    assignTask:Task[],
    getCompletedTask: Task[],
    image: string,
    id: number,
    confirmPassword: string
}

interface UserState{
    data:User|null,
    loading:boolean,
    errpr:string|null
}


const initialState:UserState={
    data:null,
    loading:false,
    error:null
}

export const fetchUser=createAsyncThunk<User,void,{rejectValue:string}>("user/fetchUser",async(_,{rejectWithValue})=>{
    try{
        const response=await fetch(API)
        if(!response.ok)
        {
            return rejectWithValue("failed to fech user in thubnk ")
        }
        const result:User=await response.json()
        return result
    }
    catch(error:any)
    {
        return rejectWithValue(error.message || "unknwon error occured in thunk")
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
        .addCase(fetchUser.fulfilled,(state,action:PayloadAction<User>)=>{
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
