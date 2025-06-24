export default function QuestionsPage({ questions, answers, onAnswerChange }) {
  return (
    <>
      {questions.map((q) => (
        <div key={q.id} className="csform-card">
            <label className="form-label">{q.question}</label>
          {q.type === "text" ? (
            <div>
              <textarea
                className="form-control"
                name={q.id}
                value={answers[q.id] || ""}
                onChange={(e) => onAnswerChange(q.id, e.target.value)}
                rows={4}
              />
            </div>
          ) : (
            q.options.map((opt) => {
              const isChecked =
                q.type === "checkbox"
                  ? answers[q.id]?.includes(opt.id)
                  : answers[q.id] === opt.id;

              return (
                <div key={opt.id} className="form-check">
                  <input
                    className="form-check-input"
                    type={q.type}
                    id={q.id + opt.id}
                    name={q.id}
                    value={opt.id}
                    checked={isChecked}
                    onChange={() =>
                      onAnswerChange(q.id, opt.id, q.type === "checkbox")
                    }
                  />
                  <label htmlFor={q.id + opt.id} className="form-check-label">
                    {opt.label}
                  </label>
                </div>
              );
            })
          )}
        </div>
      ))}
    </>
  );
}
