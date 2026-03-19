import {configureStore} from "@reduxjs/toolkit";
import surveyresponsesReducer from "./surveyresponsesreducer";
import branchesReducer from "./branchesreducer";
import formReducer from "./formSlice";

export default configureStore({
     reducer:{
        surveyresponses: surveyresponsesReducer,
        branches: branchesReducer,
        forms: formReducer,
     }
})