import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

// Mock API Service
const formContents = {
     2: {
        display_title: "Welcome to PRO1 Global Job Fair",
        slogan: "Thank you for your interest in joining PRO1. Please register now & complete this short form to apply for job opportunities.",
        action: "Apply Now",
        privacy_note: "Your information will be kept confidential and used only for recruitment purposes.",
     }
};


const servicesAPI = {
    fetchFormContents : async()=>{
        // simulate API call
        await new Promise(resolve => setTimeout(resolve,100))
        // console.log(formContents);
        return formContents;
    },
}

export const fetchFormContents = createAsyncThunk( "services/fetchFormContents", async(_,{rejectWithValue})=>{
    try{
        const data = await servicesAPI.fetchFormContents();
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

const formSlice = createSlice({
     name: 'forms',
     initialState:{
          datas:[],
          contents: [],
          loading:false,
          error: null,
          filters: {
            category: 'all',
            priceRange: {min:0,max:10000},
            rating: 0,
          }
     },
     reducers: {
          clearError:(state)=>{
               state.error = null,
               state.bookingError = null
          },
         setFilters(state,action){
               state.filters = {...state.filters,...action.payload};
         },
         clearFilters(state){
               state.filters = {
                    category: 'all',
                    priceRange: {min:0,max:10000},
                    rating: 0,
               }
         }
     },
     extraReducers: (builder)=>{
          builder
               // Fetch Form Contents
               .addCase(fetchFormContents.pending,(state)=>{
                    state.loading =true;
                    state.error = null;
               })
               .addCase(fetchFormContents.fulfilled,(state,action)=>{
                    state.loading = false;
                    state.contents = action.payload;
                    // console.log(action.payload)
               })
               .addCase(fetchFormContents.rejected,(state,action)=>{
                    state.loading = false;
                    state.error = action.error.message || "Failed to load services";
               })
     }
});

export const {clearError,setFilters,clearFilters} = formSlice.actions;
export default formSlice.reducer;