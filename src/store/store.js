import {configureStore} from "@reduxjs/toolkit";
import surveyresponsesReducer from "./surveyresponsesreducer";

export default configureStore({
     reducer:{
        surveyresponses: surveyresponsesReducer
     }
})