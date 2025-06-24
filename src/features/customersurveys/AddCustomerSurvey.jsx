import { useEffect, useState } from "react";
import axios from "axios";
import PersonalInfo from "./PersonalInfo";
import QuestionsPage from "./QuestionsPage";

export default function AddCustomerSurvey() {
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    gender: "",
    township: "",
  });

  const [questionAnswers, setQuestionAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0); // Step 0 = Personal Info

  const QUESTIONS_PER_PAGE = 5;

  useEffect(() => {
    axios.get("http://localhost:5000/api/questions").then(res => {
      const fetched = res.data;
      setQuestions(fetched);

      const initialAnswers = {};
      fetched.forEach(q => {
        initialAnswers[q.id] = q.type === "checkbox" ? [] : "";
      });
      setQuestionAnswers(initialAnswers);
    });
  }, []);

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleAnswerChange = (qId, value, isMulti = false) => {
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

  const totalSteps = Math.ceil(questions.length / QUESTIONS_PER_PAGE) + 1;

  const validateCurrentStep = () => {
    if (step === 0) {
      return formState.name && formState.age && formState.township;
    }
    const startIndex = (step - 1) * QUESTIONS_PER_PAGE;
    const currentQuestions = questions.slice(startIndex, startIndex + QUESTIONS_PER_PAGE);

    return currentQuestions.every(q => {
      const a = questionAnswers[q.id];
      return q.type === "checkbox" ? a && a.length > 0 : a !== "";
    });
  };

    const nextStep = (e) => {
        e.preventDefault();
        if (!validateCurrentStep()) {
        alert("Please answer all required fields.");
        return;
        }
        setStep(prev => prev + 1);
    };

    const prevStep = (e) => {
        e.preventDefault();
        if (step > 0) setStep(prev => prev - 1);
    };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { ...formState, answers: questionAnswers };
    console.log(data);
    // axios.post("/api/submit-survey", data)
    //   .then(() => alert("Survey submitted successfully!"))
    //   .catch(err => console.error(err));
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

        {step === 0 ? (
          <PersonalInfo formState={formState} handleChange={handleChange} />
        ) : (
          <QuestionsPage
            questions={questions.slice((step - 1) * QUESTIONS_PER_PAGE, step * QUESTIONS_PER_PAGE)}
            answers={questionAnswers}
            onAnswerChange={handleAnswerChange}
          />
        )}

        <div className="d-flex justify-content-between mt-4">
          {step > 0 && (
            <button type="button" onClick={prevStep} className="btn btn-secondary">
              Previous
            </button>
          )}

          {step < totalSteps - 1 ? (
            <button type="button" onClick={nextStep} className="btn btn-primary">
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
