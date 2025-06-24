


export default function PersonalInfo({changeHandler,formState,checkHobbyHandler,checkedhobby}){
    return (
        <>
            <div className="csform-card">
                <label className="form-label mb-2">Name</label>
                <input type="text" className="form-control underline-only" name="name" id="name" onChange={changeHandler} value={formState.name} placeholder="Please Enter Your Name" />
            </div>

            <div className="csform-card">
                <label className="form-label mb-2">Age</label>
                <input type="number" className="form-control underline-only" name="age" id="age" onChange={changeHandler} value={formState.age} placeholder="Please Enter Age" />
            </div>

        
            <div className="csform-card">
                <label  className="form-label mb-2">Gender</label>
                <div className="form-check">
                    <input type="radio" name="gender" id="genderm"  className="form-check-input"  onChange={changeHandler} value="1" />
                    <label htmlFor="genderm" >Male</label>
                </div>
                
                <div className="form-check">
                    <input type="radio" name="gender" id="genderf"  className="form-check-input"  onChange={changeHandler} value="0"  />
                    <label htmlFor="genderf">Female</label>
                </div>
            </div>

            <div className="csform-card">
                <label htmlFor="township" className="form-label mb-2">Township</label>
                <select name="township" id="township" onChange={changeHandler} value={formState.township} className="form-control underline-only">
                    {/* <option>{defaultselectvalue}</option> */}
                    <option value="mm">Hlaing</option>
                    <option value="th">Insein</option>
                    <option value="indo">Tamwe</option>   
                </select>
                <span>{formState.country}</span>
            </div>

            <div className="csform-card">
                <label  className="form-label mb-2">Hobbies</label>
                <div className="form-check">
                    <input type="checkbox" name="hobbies" id="hobby1"  className="form-check-input"  onChange={checkHobbyHandler} value="1" checked={checkedhobby(1)}/>
                    <label htmlFor="hobby1" >Football</label>
                </div>
                <div className="form-check">
                    <input type="checkbox" name="hobbies" id="hobby2"  className="form-check-input"  onChange={checkHobbyHandler} value="2" checked={checkedhobby(2)}/>
                    <label htmlFor="hobby2" >Swimming</label>
                </div>
            
            </div>
        </>
    );
}