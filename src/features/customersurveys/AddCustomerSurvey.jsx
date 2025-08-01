import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import {useNavigate,useParams} from "react-router"
import {useSearchParams,useLocation} from "react-router-dom";
import axios from "axios";
import QuestionsPage from "./QuestionsPage";
import { addsurveyresponse } from "../../store/surveyresponsesreducer";
import { fetchbranches,setcurrentbranch } from './../../store/branchesreducer'
import { APP_CONFIG } from './../../config/constant.js';
import StartPage from "./StartPage.jsx";
import FinishPage from "./FinishPage.jsx";


export default function AddCustomerSurvey() {
	
	const dispatch = useDispatch();
	
	const {form_id,branch_id} = useParams();

	// console.log(branch_id)
	

	const [form, setForm] = useState({ title: "", description: "", sections: [] });
	const [questionAnswers, setQuestionAnswers] = useState({});
	const [step, setStep] = useState(-1);
	const [errors, setErrors] = useState({});
 	const loading = useSelector(state=>state.surveyresponses.loading);

	
	const initQuestionAnswers = ()=>{
		axios.get(`${APP_CONFIG.backendURL}/api/forms/${form_id}`).then(res => {
			const fetched = res.data;
			setForm(fetched); //

			// Initialize answers for all questions
			const initialAnswers = {};
			fetched.sections.forEach(section => {
				section.questions.forEach(q => {
					initialAnswers[q.id] = q.type === "checkbox" ? [] : "";
				});
			});

			setQuestionAnswers(initialAnswers);
			// console.log(questionAnswers);
		});
	}

	useEffect(() => {
		initQuestionAnswers();
	}, []);
	useEffect(() => {
		dispatch(fetchbranches())
		dispatch(setcurrentbranch(branch_id))
	}, []);

	const currentSection = form.sections[step] || {};
	const currentQuestions = currentSection.questions || [];

	const handleAnswerChange = (qId, value, isMulti = false) => {
		// console.log(questionAnswers);
		setQuestionAnswers(prev => {
		if (isMulti) {
			const updated = prev[qId].includes(value)
			? prev[qId].filter(v => v !== value)
			: [...prev[qId], value];
			return { ...prev, [qId]: updated };
		} else {
			return { ...prev, [qId]: value };
		}
		});
	};

  	const totalSteps = form.sections.length;

	const validateCurrentStep = () => {
		const newErrors = {};
		currentQuestions.forEach(q => {
			const a = questionAnswers[q.id];
			const fieldErrors = {};

			if (q.type === "checkbox") {
				if (!a || a.length === 0) {
					fieldErrors.required = "Please select at least one option.";
				}
			} else {
				if (!a || a === "") {
					fieldErrors.required = "This question is required.";
				}
				let phoneq = q.name.toLowerCase() == 'phone';
				if(phoneq){
					let validphone = isMyanmarPhoneNumber(a);
					if (!validphone) {
						fieldErrors.myanmarphone = "This is not a valid Myanmar Phone Number.";
					}
				}
			}

			if (Object.keys(fieldErrors).length > 0) {
				newErrors[q.id] = fieldErrors;
			}
		});

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};


	
	const validateAllStep = () => {
		const newErrors = {};
		form.sections.forEach(s=>{
			s.questions.forEach(q => {
				const a = questionAnswers[q.id];
				const fieldErrors = {};
				

				if (q.type === "checkbox") {
					if (!a || a.length === 0) {
						fieldErrors.required = "Please select at least one option.";
					}
				} else {
					if (!a || a === "") {
						fieldErrors.required = "This question is required.";
					}
					console.log(fieldErrors.required);
					let phoneq = q.name.toLowerCase() == 'phone';
					if(phoneq){
						let validphone = isMyanmarPhoneNumber(a);
						if (!validphone) {
							fieldErrors.myanmarphone = "This is not a valid Myanmar Phone Number.";
						}
					}
				}

				if (Object.keys(fieldErrors).length > 0) {
					newErrors[q.id] = fieldErrors;
				}
			});
		});
		
		console.log(newErrors);
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};


	function isMyanmarPhoneNumber(phone) {
		const regex = /^(09|\+?959)[0-9]{7,9}$/;
		return regex.test(phone);
	}

    const nextStep = (e) => {
        e.preventDefault();
        if (!validateCurrentStep()) {
        // alert("Please answer all required fields.");
        return false;
        }
        setStep(prev => prev + 1);
    };

    const prevStep = (e) => {
        e.preventDefault();
        if (step > 0) setStep(prev => prev - 1);
    };

  const submitHandler = async (e) => { 
    e.preventDefault();
	if (!validateAllStep()) {
		return false;
	}
	const data = { 
		form_id: form_id,
		branch_id: branch_id,
		questionanswers: questionAnswers 
	};
	console.log(data);
	try{
		const {surveyresponse} = await dispatch(addsurveyresponse(data)).unwrap();
		let id = surveyresponse.id
		// navigate(`/surveyresponses/${form_id}/finish`);
		setStep(prev => "F");
	}catch(err){
		console.log('Add Survey Response failed',err);
	}
  };

  const clearForm = ()=>{
		setStep(-1);
		initQuestionAnswers();
		setErrors({});
		setForm({ title: "", description: "", sections: [] })
  }

   const loadingHandler = ()=>{
		dispatch({type:"LOADING_START"})
	}


	if (step === -1) {
		return <StartPage  nextStep={nextStep}/>;
	}
	else if(step >= 0){
		return (
			<div className="container csform-container">
			<form action="" method=""  onSubmit={submitHandler}>
					<div className="csform-header">
						<h2 className="mb-2">{ form.title }</h2>
						<p className="mb-0">{form.description}</p>
					</div>

					<div className="required-text">
					* Indicates required question
					</div>

				
					{currentSection && (
						<div className="mb-4">
							{/* <h4 className="mb-1">{currentSection.title}</h4>
							<p className="text-muted">{currentSection.description}</p> */}

							<div className="d-flex justify-content-between mt-2">
									<h6 className="section-header m-0">{currentSection.title}</h6>
							</div>

							<div className="section-card">
								<div className="row">
									{/* <h4 className="mb-1">{currentSection.title}</h4> */}
									<p className="text-muted">{currentSection.description}</p> 
								</div>
							</div>

							<QuestionsPage
							questions={currentQuestions}
							answers={questionAnswers}
							onAnswerChange={handleAnswerChange}
							errors={errors}
							/>
						</div>
					)}

				<div className="d-flex justify-content-between mt-4">
				{step > 0 && (
					<button type="button" onClick={prevStep} className="btn btn-secondary">
					Previous
					</button>
				)}

				{step < totalSteps - 1 ? (
					<button type="button" onClick={nextStep} className="btn btn-primary ms-auto">
					Next
					</button>
				) : (
					<button type="submit" className="btn btn-success" disabled={loading}>
					{loading ? "Processing..." : "Submit"}
					</button>
				)}
				</div>
			</form>
			</div>
		);
	}else{
		return <FinishPage  clearForm={clearForm}/>;
	}

}
