import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

// const BASEURL = `https://jsonplaceholder.typicode.com/surveyresponses`;
const BASEURL = `http://localhost:5000/api/surveyresponses`;



export const addsurveyresponse = createAsyncThunk('data/addsurveyresponse',async(obj,{fulfillWithValue,rejectWithValue})=>{
     try{
        //   const res = await axios.post(BASEURL,obj);
          console.log(obj);
        //   console.log(res);
        //   return fulfillWithValue(res.data);
        return fulfillWithValue({message:'success'})
     }catch(err){
          return rejectWithValue('Something went wrong in add surveyresponse',err);
     }
})


export const surveyresponseSlice = createSlice({
     name: "surveyresponses",
     initialState: {
          surveyresponses: [],
          loading: false,
          error: null
     },

     reducers: {

     },
     extraReducers: (builder)=>{
          builder 
               .addCase(addsurveyresponse.pending, (state) => {
      
                    console.log('Pending')
                    // state.loading = true;
                })
               .addCase(addsurveyresponse.fulfilled,(state,action)=>{
                    // state.loading = false;
                    // state.error = null;

                    // state.surveyresponses = action.payload;
                    console.log(action.payload);
               })
               .addCase(addsurveyresponse.rejected,(state,action)=>{
                    // state.loading = false;
                    // state.error = action.payload;
               })
               
     }
})

export default surveyresponseSlice.reducer;