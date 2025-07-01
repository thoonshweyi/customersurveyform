import React,{Fragment} from "react";
import {BrowserRouter as Router,Routes,Route} from "react-router"
import Welcome from "./../features/welcome"
import AddCustomerSurvey from "../features/customersurveys/AddCustomerSurvey"
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
                    
                </Routes>
            </Router>
        </Fragment>
    )
}