import React,{useState,useEffect} from "react";
export default function QuestionsPage({ questions, answers, onAnswerChange, errors = {}, setFiles}) {

	const isChecked = (q,opt)=>
              q.type === "checkbox"
                ? answers[q.id]?.includes(opt.id)
                : answers[q.id] === opt.id;
  	const [filePreviews,setFilePreviews] = useState({});

	const filesChangeHandler = (e, qId) => {
		const selectedFiles = Array.from(e.target.files);
		const limitedFiles = selectedFiles.slice(0, 5);

		setFiles(prev => ({
			...prev,
			[qId]: limitedFiles
		}));

		const previews = limitedFiles.map(file => ({
			url: URL.createObjectURL(file),
			type: file.type,
			name: file.name
		}));

		setFilePreviews(prev => ({
		...prev,
		[qId]: previews
		}));

		e.target.value = null;
	};

	const fileRemoveHandler = (qId, index) => {
		// remove from actual files
		setFiles(prev => ({
			...prev,
			[qId]: prev[qId].filter((_, i) => i !== index)
		}));

		// remove from preview
		setFilePreviews(prev => ({
			...prev,
			[qId]: prev[qId].filter((_, i) => i !== index)
		}));

	};

  return (
    <>
      {questions.map((q) => (
        <div key={q.id} className="csform-card mb-4">
          	<label className="form-label">
				{q.name} 
				{q.required && <span className="text-danger">*</span>}
				{(q.name == 'Phone' || q.en_name == 'Phone') && 
					<>
					<small className="text-muted ms-2 opacity-75 fs-6"><i>Example: </i><span className="badge bg-light text-muted border"> (09 123 456 789)</span></small>
					</>
				}
			</label>

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
			  id={`file-${q.id}`}
              className="form-control underline-only d-none"
              name={q.id}
			  	multiple
			  	onChange={(e) => {
					filesChangeHandler(e, q.id);
				}}
            />
			<label
			htmlFor={`file-${q.id}`}
			className="file-upload-label w-100 text-center"
			>
			📎 Click to attach files (Max 5)
			</label>
            {filePreviews[q.id] && (
			<div className="file-preview-container mt-2">
				{filePreviews[q.id].map((file, index) => {
				const { url, type, name } = file;

				return (
					<div key={index} className="file-item">
					
					{/* REMOVE BUTTON */}
					<button
						type="button"
						className="file-remove-btn"
						onClick={() => fileRemoveHandler(q.id, index)}
					>
						✕
					</button>

					{/* IMAGE */}
					{type.startsWith("image/") && (
						<img src={url} alt={name} className="file-preview-img" />
					)}

					{/* PDF */}
					{type === "application/pdf" && (
						<iframe src={url} title={name} className="file-preview-frame" />
					)}

					{/* VIDEO */}
					{type.startsWith("video/") && (
						<video className="file-preview-video" controls>
						<source src={url} type={type} />
						</video>
					)}

					{/* AUDIO */}
					{type.startsWith("audio/") && (
						<audio className="file-preview-audio" controls>
						<source src={url} type={type} />
						</audio>
					)}

					{/* FALLBACK */}
					{!type.startsWith("image/") &&
						type !== "application/pdf" &&
						!type.startsWith("video/") &&
						!type.startsWith("audio/") && (
						<div className="file-preview-fallback">
							📄 {name}
						</div>
						)}
					</div>
				);
				})}
			</div>
			)}
            </>
          )}
        </div>
      ))}
    </>
  );
}
