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
import FullPageLoader from "../../components/FullPageLoader.jsx";
import {fetchFormContents,setFilters,clearFilters,clearError, fetchFormFeatures,FORM_IDS, fetchFormSettings} from "../../store/formSlice";
import { createFormFeatureHandlers,getEasyQuestionIds } from "./../../assets/js/formFeatures.js";

export default function AddCustomerSurvey() {
	
	const dispatch = useDispatch();
	const {datas,contents,features,settings,loading: formLoading,error,filters} = useSelector((state)=>state.forms)
	// console.log(contents,features,settings);

	const {form_id,branch_id} = useParams();

	// console.log(branch_id)
	

	const [form, setForm] = useState({ title: "", description: "", sections: [] });
	const [questionAnswers, setQuestionAnswers] = useState({});
	const [step, setStep] = useState(-1);
	const [errors, setErrors] = useState({});
 	const loading = useSelector(state=>state.surveyresponses.loading);
	const [forceLoading, setForceLoading] = useState(true); 
	

	const [files, setFiles] = useState([]);

	const filesHandler = (e, qId) => {
		const selectedFiles = Array.from(e.target.files);

		if (selectedFiles.length > 5) {
			alert("You can upload maximum 5 files.");
			return;
		}

		setFiles(prev => ({
			...prev,
			[qId]: selectedFiles
		}));
	};

	const fetchForm = async ()=>{
		setForceLoading(true);
		try {
			await axios.get(`${APP_CONFIG.backendURL}/api/forms/${form_id}`).then(res => {
				const fetched = res.data;
				// console.log(fetched);
				setForm(fetched); //
	
			});
			
			await dispatch(fetchFormContents());
			await dispatch(fetchFormFeatures());
			await dispatch(fetchFormSettings());

		} catch (error) {
   			console.error('Fetch form error:', error);
		}finally{
			setForceLoading(false);
		}
	}

	const buildInitialAnswers = () => {
		// Initialize answers for all questions
		const initialAnswers = {};
		form.sections.forEach(section => {
			section.questions.forEach(q => {
				if (q.type === "file") return;
				initialAnswers[q.id] = q.type === "checkbox" ? [] : "";
			});
		});

		setQuestionAnswers(initialAnswers);
		// console.log(initialAnswers);
	};

	useEffect(() => {
		fetchForm();
	}, []);
	useEffect(() => {
		buildInitialAnswers();
	}, [form]);
	useEffect(() => {
		dispatch(fetchbranches())
		dispatch(setcurrentbranch(branch_id))
	}, []);


	const currentSection = form.sections[step] || {};
	let currentQuestions = currentSection.questions || [];


	const handleAnswerChange = (qId, value, isMulti = false) => {
		console.log(questionAnswers);
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
			const f = files?.[q.id];
			const fieldErrors = {};

			if (q.type === "checkbox") {
				if (!a || a.length === 0) {
					fieldErrors.required = "Please select at least one option.";
				}
			}else if (q.type === "file") {
				if ((!f || (Array.isArray(f) && f.length === 0)) && q.required) {
					fieldErrors.required = "Please upload a file.";
				}
			}else {
				if (!a || a === "") {
					fieldErrors.required = "This question is required.";
				}
				let phoneq = q.name.toLowerCase() == 'phone' || q.en_name?.toLowerCase() == 'phone';
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
				const f = files?.[q.id];
				const fieldErrors = {};
				// console.log(f);
				

				if (q.type === "checkbox") {
					if ((!a || a.length === 0) && q.required) {
						fieldErrors.required = "Please select at least one option.";
					}
				}else if (q.type === "file") {
					if ((!f || (Array.isArray(f) && f.length === 0)) && q.required) {
						fieldErrors.required = "Please upload a file.";
					}
				}
				else {
					if ((!a || a === "") && q.required) {
						fieldErrors.required = "This question is required.";
					}
					// console.log(fieldErrors.required);
					let phoneq = q.name.toLowerCase() == 'phone' || q.en_name?.toLowerCase() == 'phone';
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
	// console.log(data);
	// console.log(files);



	const formData = new FormData();
	formData.append("form_id", form_id);
	formData.append("branch_id", branch_id);
	// formData.append("questionanswers", questionAnswers);
	// formData.append("questionfiles", files);
	console.log(questionAnswers);

	Object.keys(questionAnswers).forEach((key) => {
		const value = questionAnswers[key];
		if (Array.isArray(value)) {
			value.forEach((v, i) => {
				formData.append(`questionanswers[${key}][${i}]`, v);
			});
		} else {
			formData.append(`questionanswers[${key}]`, value);
		}
	});
	Object.keys(files).forEach((key) => {
		const fileValue = files[key];
		if (Array.isArray(fileValue)) {
			fileValue.forEach((file, i) => {
				formData.append(`questionfiles[${key}][${i}]`, file);
			});
		} else {
			formData.append(`questionfiles[${key}]`, fileValue);
		}
	});

	try{
		const {surveyresponse} = await dispatch(addsurveyresponse(formData)).unwrap();
		let id = surveyresponse.id
		// navigate(`/surveyresponses/${form_id}/finish`);
		setStep(prev => "F");
	}catch(err){
		console.log('Add Survey Response failed',err);
	}
  };

  const clearForm = ()=>{
		setStep(-1);
		fetchForm();
		setErrors({});
		setForm({ title: "", description: "", sections: [] })
  }

   const loadingHandler = ()=>{
		dispatch({type:"LOADING_START"})
	}


	// Start Register Form Feature
	let featureHandlers = createFormFeatureHandlers({
		form,
		setForm,
		questionAnswers,
		setQuestionAnswers
	});
	featureHandlers = {
		...featureHandlers,
		nextStep
	}
	
	// const currentSetting = settings[form.id] || {};
	// const mode = currentSetting.applyMode || "full";
	// const easyIds = getEasyQuestionIds(form);

	// currentQuestions = (currentSection.questions || []).filter(q => {
	// 	if (mode === "easy") return true;
	// 	return !easyIds.includes(q.id);
	// });
	// End Register Form Feature


	if(forceLoading){
		return <FullPageLoader />;
	}

	if (step === -1) {
		// console.log(form);
		return <StartPage form={form} content={contents[form.id]} feature={features[form.id]} featureHandlers={featureHandlers}/>;
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
					{/* <button type="button" className="btn btn-primary" onClick={()=>easyApply(54)}>Apply</button> */}
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
							filesHandler={filesHandler}
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
