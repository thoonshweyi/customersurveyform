import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux"
import pro1globallogo from "./../../assets/icons/pro1globallogo.png"
import {Link} from "react-router-dom"
import {useNavigate,useParams} from "react-router"
import { setFormSetting } from "../../store/formSlice";
export default function StartPage({ form ={}, content={}, feature=[], featureHandlers={}}){
    console.log(featureHandlers);
	const navigate = useNavigate();
    const dispatch = useDispatch();
    
	const {branch_id} = useParams();

    const branches = useSelector(state => state.branches.branches);
	const [branchName, setBranchName] = useState("Branch...");

    useEffect(() => {
        // console.log("start")
        if(branches.length > 0){
            const branch = branches.find(branch => branch.branch_id == branch_id);
            if (branch) {
                setBranchName(branch.branch_name);
                console.log('found');
            }else{
                console.log('not found');
                navigate('/');
            }
        }
    }, [branches]);

    // useEffect(()=>{
    //     dispatch(setFilters());
    // },[dispatch]);

    if (content && Object.keys(content).length > 0) {
        return (
            <div className="container d-flex justify-content-center align-items-center min-vh-100">
                <div className="card card-custom p-5 text-center animate__animated animate__fadeInDown">
                    {/* <img src="https://cdn-icons-png.flaticon.com/512/1670/1670047.png" alt="Survey" className="mx-auto mb-4" style={{width: "80px"}} /> */}
                    <img src={pro1globallogo} alt="pro1globallogo" className="mx-auto mb-4" style={{width: "180px"}} />
                    <h1 className="mb-3 text-primary">{content.display_title}
                    </h1>
                    <p className="text-secondary mb-4">
                        {content.slogan}
                    </p>
                    
                    <div className="d-flex flex-column flex-lg-row gap-2">
                        <button
                            className="btn btn-custom flex-fill px-4 py-2 fw-semibold animate__animated animate__pulse animate__infinite"
                            onClick={(e)=>{
                                featureHandlers['nextStep'](e)
                            }}
                        >
                            {content.action}
                        </button>

                        {feature.map((f) => (
                            <button
                                key={f.name}
                                className="btn bg-danger btn-custom flex-fill px-4 py-2 fw-semibold animate__animated animate__pulse animate__infinite"
                                onClick={(e) => {
                                    featureHandlers[f.name]?.();
                                    featureHandlers['nextStep'](e)

                                    dispatch(setFormSetting({
                                        formId: form.id,
                                        data: {
                                            applyMode: "easy",
                                            activeFeature: f.name
                                        }
                                    }));
                                }}
                            >
                                {f.action}
                            </button>
                        ))}
                    </div>

                    <div className="text-muted mt-4 small">
                        {content.privacy_note}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card card-custom p-5 text-center animate__animated animate__fadeInDown">
                {/* <img src="https://cdn-icons-png.flaticon.com/512/1670/1670047.png" alt="Survey" className="mx-auto mb-4" style={{width: "80px"}} /> */}
                <img src={pro1globallogo} alt="pro1globallogo" className="mx-auto mb-4" style={{width: "180px"}} />
                <h1 className="mb-3 text-primary">Welcome to Our Survey - {branchName}
                </h1>
                <p className="text-secondary mb-4">
                    We care about your experience! This short survey will take only a few minutes and helps us serve you better.
                </p>
                
                <button className="btn btn-custom px-4 py-2 fw-semibold animate__animated animate__pulse animate__infinite" onClick={(e)=>{
                    featureHandlers['nextStep'](e)
                }}>
                    Start Survey
                </button>
                <div className="text-muted mt-4 small">
                    Your answers are confidential and help improve our services.
                </div>
            </div>
      </div>
    )
}