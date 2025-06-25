import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// const BASEURL = `https://jsonplaceholder.typicode.com/surveys`;
const BASEURL = `http://localhost:5000/api/surveys`;



export const addsurvey = createAsyncThunk('data/addsurvey',async(obj,{fulfillWithValue,rejectWithValue})=>{
     try{
        //   const res = await axios.post(BASEURL,obj);
        //   console.log(obj);
        //   console.log(res);
        //   return fulfillWithValue(res.data);
        return fulfillWithValue({message:'success'})
     }catch(err){
          return rejectWithValue('Something went wrong in add survey',err);
     }
})


export const surveySlice = createSlice({
     name: "surveys",
     initialState: {
          surveys: [],
          loading: false,
          error: null
     },

     reducers: {

     },
     extraReducers: (builder)=>{
          builder 
               .addCase(addsurvey.pending, (state) => {
      
                    console.log('Pending')
                    // state.loading = true;
                })
               .addCase(addsurvey.fulfilled,(state,action)=>{
                    // state.loading = false;
                    // state.error = null;

                    // state.surveys = action.payload;
                    console.log(action.payload);
               })
               .addCase(addsurvey.rejected,(state,action)=>{
                    // state.loading = false;
                    // state.error = action.payload;
               })
               
     }
})

export default surveySlice.reducer;