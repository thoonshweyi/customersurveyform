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
                    <Route path="/" element={<Navigate to="/surveyresponses/1/start" replace />} />
                    <Route path="/surveyresponses/:branch_id/start" element={<StartPage/>} />
                    {/* <Route path="/add" element={<AddUser/>} />
                    <Route path="/edit/:id" element={<EditUser/>} />
                    <Route path="/delete/:id" element={<DeleteUser/>} /> */}
                    
                    <Route path="/forms/:branch_id/:id" element={<AddCustomerSurvey/>} />
                    <Route path="/surveyresponses/:id/finish" element={<FinishPage/>} />
                    
                </Routes>
            </Router>
        </Fragment>
    )
}