import { useEffect } from "react";



export default function QuestionList({changeHandler,formState,checkedHandler,checkedInput,addQuestionInit}){

    useEffect(()=>{
        if(formState.questions1 == undefined){
            console.log("hay");
            addQuestionInit({
                "questions1" : []
            })
        }
    },[])

    // if (formState.questions1 === undefined) {
    //     return null; // or a loading spinner
    // }

    return (
        <div className="csform-card">
            <label  className="form-label mb-2">၁။ PRO 1 Global Home Center သို့ မကြာခဏ စျေးဝယ်လာဖြစ်ပါသလား?</label>
            <div className="form-check">
                <input type="checkbox" name="questions1" id="questions1"  className="form-check-input"  onChange={checkedHandler} value="1" checked={checkedInput("questions1",1)}/>
                <label htmlFor="questions1" >အပတ်စဉ်</label>
            </div>
            <div className="form-check">
                <input type="checkbox" name="questions1" id="questions2"  className="form-check-input"  onChange={checkedHandler} value="2" checked={checkedInput("questions1",2)}/>
                <label htmlFor="questions2" >လစဉ်</label>
            </div>
            <div className="form-check">
                <input type="checkbox" name="questions1" id="questions3"  className="form-check-input"  onChange={checkedHandler} value="3" checked={checkedInput("questions1",3)}/>
                <label htmlFor="questions3" >၃လတစ်ကြိမ်</label>
            </div>
            <div className="form-check">
                <input type="checkbox" name="questions1" id="questions4"  className="form-check-input"  onChange={checkedHandler} value="4" checked={checkedInput("questions1",4)}/>
                <label htmlFor="questions4" >တခါတလေ</label>
            </div>
        </div>
    )
}