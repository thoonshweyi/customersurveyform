import {configureStore} from "@reduxjs/toolkit";
import surveyresponsesReducer from "./surveyresponsesreducer";
import branchesReducer from "./branchesreducer";


export default configureStore({
     reducer:{
        surveyresponses: surveyresponsesReducer,
        branches: branchesReducer,
     }
})