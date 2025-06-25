export default function QuestionsPage({ questions, answers, onAnswerChange, errors = {} }) {
  return (
    <>
      {questions.map((q) => (
        <div key={q.uuid} className="csform-card mb-4">
          <label className="form-label">{q.name} <span className="text-danger">*</span></label>

          {errors[q.uuid] && (
            <div className="text-danger small mb-1">{errors[q.uuid]}</div>
          )}

          {q.type === "text" && (
            <input
              type="text"
              className="form-control underline-only"
              name={q.uuid}
              value={answers[q.uuid] || ""}
              onChange={(e) => onAnswerChange(q.uuid, e.target.value)}
            />
          )}

          {q.type === "textarea" && (
            <textarea
              className="form-control"
              name={q.uuid}
              value={answers[q.uuid] || ""}
              onChange={(e) => onAnswerChange(q.uuid, e.target.value)}
              rows={4}
            />
          )}

          {(q.type === "checkbox" || q.type === "radio") && q.options?.map((opt) => {
            const isChecked =
              q.type === "checkbox"
                ? answers[q.uuid]?.includes(opt.id)
                : answers[q.uuid] === opt.id;

            return (
              <div key={opt.id} className="form-check">
                <input
                  className="form-check-input"
                  type={q.type}
                  id={q.uuid + opt.id}
                  name={q.uuid}
                  value={opt.id}
                  checked={isChecked}
                  onChange={() =>
                    onAnswerChange(q.uuid, opt.id, q.type === "checkbox")
                  }
                />
                <label htmlFor={q.uuid + opt.id} className="form-check-label">
                  {opt.label}
                </label>
              </div>
            );
          })}
        </div>
      ))}
    </>
  );
}
