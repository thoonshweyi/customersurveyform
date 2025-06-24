export default function PersonalInfo({ formState, handleChange }) {
  return (
    <>
        <div className="csform-card">
            <label className="form-label mb-0">Name *</label>
            <input type="text" name="name" value={formState.name} onChange={handleChange} className="form-control  underline-only" />
        </div>

        <div className="csform-card">
            <label className="form-label mb-2">Age *</label>
            <input type="number" name="age" value={formState.age} onChange={handleChange} className="form-control  underline-only" />
        </div>

        
        <div className="csform-card">
                <label className="form-label d-block mb-2">Gender *</label>
                <div className="form-check form-check-inline">
                    <input
                        type="radio"
                        id="gender_male"
                        name="gender"
                        value="male"
                        checked={formState.gender === "male"}
                        onChange={handleChange}
                        className="form-check-input"
                    />
                    <label htmlFor="gender_male" className="form-check-label">Male</label>
                </div>

                <div className="form-check form-check-inline">
                    <input
                        type="radio"
                        id="gender_female"
                        name="gender"
                        value="female"
                        checked={formState.gender === "female"}
                        onChange={handleChange}
                        className="form-check-input"
                    />
                    <label htmlFor="gender_female" className="form-check-label">Female</label>
                </div>
        </div>

        <div className="csform-card">
            <label className="form-label mb-2">Township *</label>
            <select
            name="township"
            value={formState.township}
            onChange={handleChange}
            className="form-control"
            required
            >
            <option value="">-- Select Township --</option>
            <option value="kamayut">Kamayut</option>
            <option value="hlaing">Hlaing</option>
            <option value="mayangone">Mayangone</option>
            <option value="thingangyun">Thingangyun</option>
            <option value="sanchaung">Sanchaung</option>
            </select>
        </div>

    </>
  );
}
