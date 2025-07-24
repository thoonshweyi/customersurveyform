import { createSlice,createAsyncThunk } from '@reduxjs/toolkit'
import axios from "axios";
import { APP_CONFIG } from './../config/constant.js';

const BASEURL = `${APP_CONFIG.backendURL}/api/branches/`;

// Thunk to fetch branches
export const fetchbranches = createAsyncThunk('data/fetchbranches',async(obj,{rejectWithValue})=>{
     try{
          const res = await axios.get(BASEURL);
          return res.data;
     }catch(err){
          return rejectWithValue('Something went wrong in fetchuser',err);
     }
})

export const branchesSlice = createSlice({
  name: 'branches',
  initialState: {
	branches: [],
    branch_id: 1
  },
  reducers: {
    setcurrentbranch: (state, action) => {
      state.branch_id = action.payload
    }
  },
   extraReducers: (builder)=>{
          builder 
			.addCase(fetchbranches.pending,(state)=>{
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchbranches.fulfilled,(state,action)=>{
				state.loading = false;
				state.error = null;

				state.branches = action.payload;
			})
			.addCase(fetchbranches.rejected,(state,action)=>{
				state.loading = false;
				state.error = action.payload;
			})
               
     }
  
})
// console.log(branchesSlice);
// Action creators are generated for each case reducer function
export const { setcurrentbranch } = branchesSlice.actions

export default branchesSlice.reducer