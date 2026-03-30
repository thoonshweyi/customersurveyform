import { FORM_IDS,formFeatures } from "./../../store/formSlice";

const getQuestionIdsByName = (form, names = []) => {
    return form.sections
        .flatMap(section => section.questions)
        .filter(q => names.includes(q.name) || names.includes(q.en_name))
        .map(q => q.id);
};

//  Factory function
export const createFormFeatureHandlers = ({ form, setForm, questionAnswers, setQuestionAnswers }) => {

    return {
        easyApply: () => {
            const featureConfig = formFeatures[form.id]?.find(
                f => f.name === "easyApply"
            );
            let questionIds = [];

            const questionNames = [
                ...(featureConfig?.questionNames || []),
                'Name',
                'Phone'
            ];
            questionIds = getQuestionIdsByName(form, questionNames);

            const ids = Array.isArray(questionIds) ? questionIds : [questionIds];

            const newForm = {
                ...form,
                sections: form.sections
                    .map(section => ({
                        ...section,
                        questions: section.questions
                            .filter(q => ids.includes(q.id))
                            .map(q => ({
                                ...q,
                                required: true
                            }))
                    }))
                    .filter(section => section.questions.length > 0)
            };

            setForm(newForm);

            const initialAnswers = {};
            newForm.sections.forEach(section => {
                section.questions.forEach(q => {
                    initialAnswers[q.id] = q.type === "checkbox" ? [] : "";
                });
            });

            setQuestionAnswers(initialAnswers);
        },

        uploadCV: () => {
            console.log("Upload CV for form", form.id);
        }
    };
};