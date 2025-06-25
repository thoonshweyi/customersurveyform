import {configureStore} from "@reduxjs/toolkit";
import surveysReducer from "./surveysreducer";

export default configureStore({
     reducer:{
        surveys: surveysReducer
     }
})