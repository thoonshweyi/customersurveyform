import { useEffect, useState } from "react";
import pro1globallogo from "./../../assets/icons/pro1globallogo.png"
import {Link} from "react-router-dom"
import {useNavigate,useParams} from "react-router"
import {useDispatch,useSelector} from "react-redux";
import { setcurrentbranch } from './../../store/branchesreducer'
export default function StartPage(){
    
	const dispatch = useDispatch();
	const {branch_id} = useParams();
    useEffect(() => {
        
        dispatch(setcurrentbranch(branch_id))
    }, []);

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card card-custom p-5 text-center animate__animated animate__fadeInDown">
                {/* <img src="https://cdn-icons-png.flaticon.com/512/1670/1670047.png" alt="Survey" className="mx-auto mb-4" style={{width: "80px"}} /> */}
                <img src={pro1globallogo} alt="pro1globallogo" className="mx-auto mb-4" style={{width: "180px"}} />
                <h1 className="mb-3 text-primary">Welcome to Our Survey</h1>
                <p className="text-secondary mb-4">
                    We care about your experience! This short survey will take only a few minutes and helps us serve you better.
                </p>
                {/* <a href="#start-survey" className="btn btn-custom px-4 py-2 fw-semibold animate__animated animate__pulse animate__infinite">
                    Start Survey
                </a> */}
                <Link to={ `/forms/${branch_id}/1` }  className="btn btn-custom px-4 py-2 fw-semibold animate__animated animate__pulse animate__infinite">Start  Survey</Link>
                <div className="text-muted mt-4 small">
                    Your answers are confidential and help improve our services.
                </div>
            </div>
      </div>
    )
}