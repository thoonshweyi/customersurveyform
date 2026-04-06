import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";

export const FORM_IDS = {
     PGHC_CUSTOMER_SURVEY_FORM: 1,
     PRO1_GLOBAL_CV_FORM: 2,
};



// Mock API Service
const formContents = {
     [FORM_IDS.PRO1_GLOBAL_CV_FORM] : {
        display_title: "Welcome to PRO1 Global Job Fair",
        slogan: "Thank you for your interest in joining PRO1. Please register now & complete this short form to apply for job opportunities.",
     //    action: "Apply Now",
        privacy_note: "Your information will be kept confidential and used only for recruitment purposes.",
     }
};

export const formFeatures = {
     [FORM_IDS.PRO1_GLOBAL_CV_FORM]: [
          {
               name: 'fullApply',
               action: 'Apply Now',
               questionNames: ['Attach CV'],
               styles: 'btn-custom'
          }
          ,{
               name: 'easyApply',
               action: 'Attach CV',
               questionNames: ['Attach CV'],
               styles: 'bg-danger'
          }
     ]
};

const formSettings = {
     [FORM_IDS.PRO1_GLOBAL_CV_FORM]: [{
          featureName: 'easyApply',
          applyMode: 'action'
     }]
}

const servicesAPI = {
     fetchFormContents : async()=>{
        // simulate API call
        await new Promise(resolve => setTimeout(resolve,100))
        // console.log(formContents);
        return formContents;
     },
     fetchFormFeatures : async()=>{
        // simulate API call
        await new Promise(resolve => setTimeout(resolve,100))
        return formFeatures;
     },
     fetchFormSettings : async()=>{
        // simulate API call
        await new Promise(resolve => setTimeout(resolve,100))
        return formSettings;
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

export const fetchFormFeatures = createAsyncThunk( "services/fetchFormFeatures", async(_,{rejectWithValue})=>{
    try{
        const data = await servicesAPI.fetchFormFeatures();
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

export const fetchFormSettings = createAsyncThunk( "services/fetchFormSettings", async(_,{rejectWithValue})=>{
    try{
        const data = await servicesAPI.fetchFormSettings();
        return data;
    }catch(error){
        return rejectWithValue(error.message);
    }
});

const formSlice = createSlice({
     name: 'forms',
     initialState:{
          datas:[],
          contents: {},
          features: {},
          settings: {},
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
          },
          setFormSetting(state, action) {
               const { formId, data } = action.payload;
               console.log(state.settings[formId]);
               state.settings[formId] = {
                    ...(state.settings[formId] || {}),
                    ...data
               };
               console.log(state.settings[formId]);
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
               .addCase(fetchFormFeatures.pending,(state)=>{
                    state.loading =true;
                    state.error = null;
               })
               .addCase(fetchFormFeatures.fulfilled,(state,action)=>{
                    state.loading = false;
                    state.features = action.payload;
                    // console.log(action.payload)
               })
               .addCase(fetchFormFeatures.rejected,(state,action)=>{
                    state.loading = false;
                    state.error = action.error.message || "Failed to load services";
               })
               .addCase(fetchFormSettings.pending,(state)=>{
                    state.loading =true;
                    state.error = null;
               })
               .addCase(fetchFormSettings.fulfilled,(state,action)=>{
                    state.loading = false;
                    state.settings = action.payload;
                    // console.log(action.payload)
               })
               .addCase(fetchFormSettings.rejected,(state,action)=>{
                    state.loading = false;
                    state.error = action.error.message || "Failed to load services";
               })
     }
});

export const {clearError,setFilters,clearFilters,setFormSetting} = formSlice.actions;
export default formSlice.reducer;