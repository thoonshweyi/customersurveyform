import React,{useState,useEffect} from "react";
export default function QuestionsPage({ questions, answers, onAnswerChange, errors = {}, filesHandler}) {

	const isChecked = (q,opt)=>
              q.type === "checkbox"
                ? answers[q.id]?.includes(opt.id)
                : answers[q.id] === opt.id;
  const [filePreviews,setFilePreviews] = useState({});
  return (
    <>
      {questions.map((q) => (
        <div key={q.id} className="csform-card mb-4">
          <label className="form-label">{q.name} {q.required && <span className="text-danger">*</span>}</label>

          {errors[q.id] && (
            <div className="text-danger small mb-1">

                {Object.values(errors[q.id]).map((msg, index) => (
                  <div key={index}>{msg}</div>
                ))}
            </div>
          )}

          {q.type === "text" && (
            <input
              type="text"
              className="form-control underline-only"
              name={q.id}
              value={answers[q.id] || ""}
              onChange={(e) => onAnswerChange(q.id, e.target.value)}
            />
          )}

          {q.type === "date" && (
            <input
              type="date"
              className="form-control underline-only"
              name={q.id}
              value={answers[q.id] || ""}
              onChange={(e) => onAnswerChange(q.id, e.target.value)}
            />
          )}

          {q.type === "textarea" && (
            <textarea
              className="form-control"
              name={q.id}
              value={answers[q.id] || ""}
              onChange={(e) => onAnswerChange(q.id, e.target.value)}
              rows={4}
            />
          )}

          {(q.type === "checkbox" || q.type === "radio") && q.options?.map((opt) => {
            const isChecked =
              q.type === "checkbox"
                ? answers[q.id]?.includes(opt.id)
                : answers[q.id] === opt.id;

            return (
              <div key={opt.id} className="form-check">
                <input
                  className="form-check-input"
                  type={q.type}
                  id={q.id + "-" + opt.id}
                  name={q.id}
                  value={opt.id}
                  checked={isChecked}
                  onChange={() =>
                    onAnswerChange(q.id, opt.id, q.type === "checkbox")
                  }
                />
                <label htmlFor={q.id + "-" + opt.id} className="form-check-label">
                  {opt.name}
                </label>
              </div>
            );
          })}


          {q.type === "selectbox" && (
            <select
            className="form-select"
            name={q.id}
            value={answers[q.id] || ""}
            onChange={(e) => onAnswerChange(q.id, e.target.value)}
            >
              <option value="">-- Please select --</option>
              {q.options?.map((opt) => (
                <option key={opt.id} value={opt.id}>
                {opt.name}
                </option>
              ))}
            </select>
          )}

			
          {q.type === "rating" && (
            <div className="d-flex justify-content-around align-items-center mb-2">
              {q.options?.map((opt, index) => {
                const selectedOptionId = answers[q.id];
                const selectedIndex = q.options.findIndex(o => o.id === selectedOptionId);
                const isFilled = index <= selectedIndex;

                return (
                  <div key={opt.id} className="text-center">
                    <div className="form-group">
                      <label>{opt.name}</label>
                    </div>
                    <i
                      className={`fa fa-star${isFilled ? "" : "-o"} text-warning`}
                      style={{ fontSize: "1.5rem", cursor: "pointer" }}
                      onClick={() => onAnswerChange(q.id, opt.id)} // ✅ store option.id
                    ></i>
                  </div>
                );
              })}
            </div>
          )}

          {q.type === "file" && (
            <>
            <input
              type="file"
              className="form-control underline-only"
              name={q.id}
              onChange={(e) => {
                const file = e.target.files[0];
                filesHandler(e,q.id);

                if (file) {
                  const previewUrl = URL.createObjectURL(file);

                  setFilePreviews((prev) => ({
                    ...prev,
                    [q.id]: previewUrl
                  }));
                }
              }}
            />
            {filePreviews[q.id] && (
              <div>
                {/* <p className="mb-1">Preview:</p> */}
                <img
                  src={filePreviews[q.id]}
                  className="img-fluid rounded border"
                  alt="bank slip preview"
                  style={{ maxHeight: "250px", objectFit: "contain" }}
                />
              </div>
            )}
            </>
          )}
        </div>
      ))}
    </>
  );
}
