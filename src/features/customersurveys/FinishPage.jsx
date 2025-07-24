import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router"
export  default function FinishPage({clearForm}){
    const {form_id,branch_id} = useParams();

    const clickHandler = ()=>{
        clearForm()
    }
    return (
        <>
            <div className="container csform-container">
                <form action="" method=""  >
                        <div className="csform-header">
                            <h2 className="mb-2">Responses For Customer Survey Form</h2>
                            <p className="my-4">Your response has been recorded</p>

                            {/* <Link to={`/surveyresponses/${form_id}/${branch_id}/create`} className="text-decoration-underline py-4">Submit another response</Link> */}
                            <Link className="text-decoration-underline py-4" onClick={clickHandler}>Submit another response</Link>
                        </div>
                </form>
            </div>
        </>
    )
}