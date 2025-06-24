import React,{useState} from "react";
import {useSearchParams,useLocation} from "react-router-dom";
import PersonalInfo from "./PersonalInfo";
import QuestionsList from "./QuestionsList";


export default function AddCustomerSurvey(){
    const defaultselectvalue = 'Choose a township'
    const init = {
        name: "",
        age: "",
        gender: "",
        township:"",
        hobbies: [],
    }
    const [formState,setFormState] = useState(init);
    const [stepState,setStepState] = useState(1);

    const changeHandler = e=>{
        // console.log(e.target);
        // console.log(e.target.name);
        // console.log(e.target.id);
        // console.log(e.target.value);

        // console.log(formState); // {firstname: '', lastname: '', city: ''}

        setFormState({
            ...formState, // spread operator
            [e.target.name]:e.target.value
        });
        // to mix with previous formState value
        // overwrite the previous formState with the entered input value

        //  console.log(formState);
     }     

    const checkHobbyHandler = (e)=>{
        let hobbyvalue = e.target.value;
        if(formState.hobbies.some(hobby=>hobby === hobbyvalue)){
          const filterhobby = formState.hobbies.filter(hobby=>hobby != hobbyvalue);
          setFormState(prev=>{
               return {...prev,hobbies:filterhobby};
          });
        }else{
          setFormState(prev=>{
               return {...prev,hobbies:[...prev.hobbies,hobbyvalue]}
          });
        }
    }

    
    const checkedhobby = (hobbyvalue)=>{
          return formState.hobbies.some(hobby=>hobby == hobbyvalue);
    }

    const checkedHandler = (e)=>{
        let value = e.target.value;
        let names = e.target.name;
        console.log(formState[names]);
        if(formState[names].some(name=>name === value)){
          const filternames = formState[names].filter(name=>name != value);
          setFormState(prev=>{
               return {...prev,[names]:filternames};
          });
        }else{
          setFormState(prev=>{
               return {...prev,[names]:[...prev[names],value]}
          });
        }
    }

    const checkedInput = (inputnames,inputvalue)=>{

        if(formState[inputnames] === undefined){
            return false;
        }
        return formState[inputnames].some(inputname=>inputname == inputvalue);
    }


    const submitHandler = (e)=>{
          e.preventDefault();

          console.log(formState);
        //   settasks(prev=>{
        //        return [...prev,formState]
        //   });

        //   setFormState({
        //        name:"",
        //        quantity:1,
        //        tags:[],
        //        package:""
        //   });
    }

    const addQuestionInit = (prop)=>{
        setFormState(prev=>{
            return {
            ...prev,
            ...prop
            }
        })
    }

    const [searchParams] = useSearchParams();
    let page = searchParams.get('page');
    // console.log(page);

    const renderStep = () => {
        switch (stepState) {
            case 1:
                return <PersonalInfo changeHandler={changeHandler} formState={formState} checkHobbyHandler={checkHobbyHandler} checkedhobby={checkedhobby} />;
            case 2:
                return <QuestionsList changeHandler={changeHandler} formState={formState} checkedHandler={checkedHandler} checkedInput={checkedInput} addQuestionInit={addQuestionInit} />;
            // case 3:
            //     return <Step3 ... />;
            default:
                return <div>Form Completed</div>;
        }
    };

    const nextStep = () => {
        setStepState(prev => prev + 1);
    };

    const prevStep = () => {
        setStepState(prev => (prev > 1 ? prev - 1 : 1));
    };


    return (
            <div className="container csform-container">
               <form action="" method="" onSubmit={submitHandler}>
    
                    <div className="csform-header">
                        <h2 className="mb-2">Customer Satisfaction Survey</h2>
                    </div>

                    <div className="required-text">
                    * Indicates required question
                    </div>


                    {renderStep()}

                    <div className="d-flex justify-content-between align-item-center py-2">
                        {stepState > 1 ? <button type="button" onClick={prevStep} className="btn btn-secondary">Previous</button> : <span></span>}
                        {stepState < 3
                        ? <button type="button" onClick={nextStep} className="btn btn-primary">Next</button>
                            : <button type="submit" className="btn btn-success">Submit</button>
                        }
                    </div>
                </form>
            </div>
    );
}