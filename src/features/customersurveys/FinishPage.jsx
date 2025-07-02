import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router"
export  default function FinishPage(){
    const {id} = useParams();
    const currentsurveyresponse = useSelector((state)=> state.surveyresponses.surveyresponses.find((surveyresponse) => surveyresponse.id == parseInt(id)))
    return (
        <>
            <div className="container csform-container">
                <form action="" method=""  >
                        <div className="csform-header">
                            <h2 className="mb-2">Responses For Customer Survey Form</h2>
                            <p className="my-4">Your response has been recorded</p>

                            <Link to="/" className="text-decoration-underline py-4">Submit another response</Link>
                        </div>
                </form>
            </div>
        </>
    )
}