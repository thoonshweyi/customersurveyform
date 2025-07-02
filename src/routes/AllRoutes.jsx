import React,{Fragment} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router"
import Welcome from "./../features/welcome"
import AddCustomerSurvey from "../features/customersurveys/AddCustomerSurvey"
import FinishPage from "../features/customersurveys/FinishPage"
export default function AllRoutes(){
    return (
        <Fragment>
            <Router>
                <Routes>
                    <Route path="/" element={<Welcome/>} />
                    {/* <Route path="/add" element={<AddUser/>} />
                    <Route path="/edit/:id" element={<EditUser/>} />
                    <Route path="/delete/:id" element={<DeleteUser/>} /> */}
                    
                    <Route path="/forms/:id" element={<AddCustomerSurvey/>} />
                    <Route path="/surveyresponses/:id/finish" element={<FinishPage/>} />
                    
                </Routes>
            </Router>
        </Fragment>
    )
}