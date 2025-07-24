import React,{Fragment} from "react";
import {BrowserRouter as Router,Routes,Route,Navigate} from "react-router"
import StartPage from "../features/customersurveys/StartPage"
import AddCustomerSurvey from "../features/customersurveys/AddCustomerSurvey"
import FinishPage from "../features/customersurveys/FinishPage"
export default function AllRoutes(){
    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/surveyresponses/1/1/create" replace />} />
                       
                    <Route path="/surveyresponses/:form_id/:branch_id/create" element={<AddCustomerSurvey/>} />
                    
                </Routes>
            </Router>
        </Fragment>
    )
}