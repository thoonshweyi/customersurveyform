import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import Swal from 'sweetalert2';
import axios from "axios";

// const BASEURL = `https://jsonplaceholder.typicode.com/surveyresponses`;
const BASEURL = `http://localhost:8000/api/surveyresponses/`;



export const addsurveyresponse = createAsyncThunk('data/addsurveyresponse',async(obj,{fulfillWithValue,rejectWithValue})=>{
     let res;
     try{
          res = await axios.post(BASEURL,obj);
          // console.log(obj);
          console.log(res);
        //   return fulfillWithValue(res.data);

        if(res.status == 200 && res.data.message){
          return fulfillWithValue(res.data)
        }else{
          return rejectWithValue(res.data);
        }
     }catch(err){
          return rejectWithValue(err);
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
                    console.log(state);
                    state.loading = true;
                })
               .addCase(addsurveyresponse.fulfilled,(state,action)=>{
                    state.loading = false;
                    // state.error = null;

                    state.surveyresponses.push(action.payload.surveyresponse);
                    console.log(action.payload);
                    Swal.fire({
                         title: "Saved!",
                         text: `${action.payload.message}`,
                         icon: "success"
                    });
               })
               .addCase(addsurveyresponse.rejected, (state, action) => {
                    
                    state.loading = false;
                    let errorMessage = "Something went wrong!";
                    const errors = action.payload?.response?.data?.errors;

          
                    if (errors) {
                         errorMessage = Object.values(errors)
                              .flat()
                              .map((msg, i) => `${i + 1}. ${msg}`)
                              .join("<br>");
                    } else if (action.payload?.error) {
                         errorMessage = action.payload.error;
                    } else if (action.payload?.message) {
                         errorMessage = action.payload.message;
                    }

                    Swal.fire({
                         icon: "error",
                         title: "Submission Failed",
                         text: errorMessage,
                    });


               })
          }
});
export default surveyresponseSlice.reducer;