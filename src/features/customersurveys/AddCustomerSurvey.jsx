import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router"
import axios from "axios";
import PersonalInfo from "./PersonalInfo";
import QuestionsPage from "./QuestionsPage";
import { addsurvey } from "../../store/surveysreducer";

export default function AddCustomerSurvey() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [questionAnswers, setQuestionAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0); // Step 0 = Personal Info
  const [errors, setErrors] = useState({});



  
  const QUESTIONS_PER_PAGE = 5;

  useEffect(() => {
    // First API Call
      axios.get("http://localhost:5000/api/headerques").then(res => {
        const fetched = res.data;
        setQuestions(fetched);

        const initialAnswers = {};
        fetched.forEach(q => {
          initialAnswers[q.uuid] = q.type === "checkbox" ? [] : "";
        });
        setQuestionAnswers(initialAnswers);

        // Nested second call only after first one completes
        axios.get("http://localhost:5000/api/questions").then(res => {
          const moreFetched = res.data;

          setQuestions(prev => [...prev, ...moreFetched]);

          const moreAnswers = {};
          moreFetched.forEach(q => {
            moreAnswers[q.uuid] = q.type === "checkbox" ? [] : "";
          });

          setQuestionAnswers(prev => ({ ...prev, ...moreAnswers }));
        });
      });
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (qId, value, isMulti = false) => {
    console.log()
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

  const totalSteps = Math.ceil(questions.length / QUESTIONS_PER_PAGE);

  const validateCurrentStep = () => {
    
    const startIndex = (step) * QUESTIONS_PER_PAGE;
    const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);
    const newErrors = {};

     currentQuestions.forEach(q => {
      const a = questionAnswers[q.uuid];
      if (q.type === "checkbox") {
        if (!a || a.length === 0) {
          newErrors[q.uuid] = "Please select at least one option.";
        }
      } else {
        if (!a || a === "") {
          newErrors[q.uuid] = "This question is required.";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    const data = { answers: questionAnswers };
    console.log(data);
      try{
            await dispatch(addsurvey(data)).unwrap();
            // navigate('/');
      }catch(err){
            console.log('Add user failed',err);
      }
  };

  return (
    <div className="container csform-container">
      <form action="" method=""  onSubmit={submitHandler}>
            <div className="csform-header">
                <h2 className="mb-2">Customer Satisfaction Survey</h2>
            </div>

            <div className="required-text">
            * Indicates required question
            </div>

        
          <QuestionsPage
            questions={questions.slice((step) * QUESTIONS_PER_PAGE, (step + 1) * QUESTIONS_PER_PAGE)}
            answers={questionAnswers}
            onAnswerChange={handleAnswerChange}
            errors={errors}
          />

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
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
